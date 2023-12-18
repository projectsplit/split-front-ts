import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { StyledBarChart } from "./BarChart.styled";
import Carousel from "../../Carousel/Carousel";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";
import { months, shortWeekdays } from "../../../../constants/dates";
import { BarChartProps } from "../../../../interfaces";
import { convertToFullMonthNames, getAllDaysInMonth } from "../../helpers/monthlyDataHelpers";
import { createGroupedLabels } from "../../helpers/createGroupedLabels";
import { getChartOptions } from "./options/getChartOptions";
import { groupExpensesPerWeek } from "../../helpers/groupExpensesPerWeek";
import { useCycleEffectEffect } from "../../hooks/useCycleIndexEffect";
import { useSignal } from "@preact/signals-react";
import { buildStartAndEndDates } from "../../helpers/buildStartAndEndDates";
import { useStartAndEndDatesEffect } from "../../hooks/useStartEndDatesEffect";
import useCumulativeSpendingArray from "../../../../hooks/useCumulativeSpendingArray";
import { noData } from "../plugins/noData";
import { CycleType } from "../../../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function BarChart({
  selectedCycle,
  selectedYear,
  currentDateIndex,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
}: BarChartProps) {

  const startDate = useSignal<string>(
    buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear
    )[0]
  );

  const endDate = useSignal<string>(
    buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear
    )[1]
  );

  const { data: cumulArrayData, isSuccess } = useCumulativeSpendingArray(
    startDate.value,
    endDate.value
  );

  const deCumulArray = (cumulArr: number[] | undefined) => {
    if (cumulArr === undefined) return [];
    const deCumuledArr: number[] = [];
    cumulArr.map((c: number, index: number) => {
      const adjIndex = cumulArr.length - 1 - index;
      if (adjIndex !== 0)
        deCumuledArr.push(
          Number((cumulArr[adjIndex] - cumulArr[adjIndex - 1]).toFixed(2))
        ); //TODO: Use currency.js
      if (adjIndex === 0)
        deCumuledArr.push(Number(cumulArr[adjIndex].toFixed(2)));
    });
    return deCumuledArr.reverse();
  };

  const expenseDataPoints = deCumulArray(cumulArrayData); //getRandomNumbers(31, -500, 1000); // This is supposed to be the total amount spent per calendar day

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const datesToNumbers = allDaysInMonth.map((day) => day.getDate());

  const labelBuilder = (cycle: CycleType) => {
    switch (cycle) {
      case CycleType.Monthly:
        return createGroupedLabels(datesToNumbers);
      case CycleType.Weekly:
        return shortWeekdays;
      default:
        return [];
    }
  };

  const labels = labelBuilder(selectedCycle.value);

  useCycleEffectEffect(selectedCycle, selectedTimeCycleIndex, currentDateIndex);

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const options = getChartOptions(
    isSuccess,
    monthsAndDaysArrays,
    selectedCycle.value,
    labels,
    datesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    "USD"
  );


  const expenseDataBuilder = (cycle: CycleType,expenseDataPoints: number[]) => {
    switch (cycle) {
      case CycleType.Monthly:
        return groupExpensesPerWeek(expenseDataPoints);
      case CycleType.Weekly:
        return expenseDataPoints;
      default:
        return [];
    }
  };

  const expenseData = expenseDataBuilder(selectedCycle.value,expenseDataPoints);

  const data = {
    labels: labels,
    datasets: [
      {
        label: "cumulative spending",
        data: expenseData,
        backgroundColor: "rgba(153, 30, 251, 0.5)",
        borderWidth: 2,
        datalabels: {
          anchor: "end",
        },
      },
    ],
  } as any;

  return (
    <StyledBarChart>
      <Bar options={options} data={data} plugins={[noData, ChartDataLabels]} />
      <div className="periodOptions">
        <Carousel
          carouselItems={getCarouselItemsBasedOnCycle(
            selectedCycle.value,
            months,
            monthsAndDaysArrays
          )}
          selectedTimeCycleIndex={selectedTimeCycleIndex}
          selectedCycle={selectedCycle}
          cyclehaschanged={cyclehaschanged}
          menu={menu}
        />
      </div>
    </StyledBarChart>
  );
}


  // const getRandomNumbers = (length: number, min: number, max: number) => {
  //   const numbers = [];
  //   for (let i = 0; i < length; i++) {
  //     const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  //     numbers.push(randomNumber);
  //   }
  //   return numbers;
  // };

 