import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { _DeepPartialObject } from "chart.js/dist/types/utils";
import useCumulativeSpendingArray from "../../../../hooks/useCumulativeSpendingArray";
import { StyledCumulativeSpending } from "./CumulativeSpending.styled";
import Carousel from "../../Carousel/Carousel";
import { CumulativeSpendingProps } from "../../../../interfaces";
import { useSignal } from "@preact/signals-react";
import { noData } from "../plugins/noData";
import { getAllDaysInMonth } from "../../helpers/monthlyDataHelpers";
import { months} from "../../../../constants/dates";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";
import { buildStartAndEndDates } from "../../helpers/buildStartAndEndDates";
import { getChartOptions } from "./options/getChartOptions";
import { getData } from "./data/getData";
import { buildLabels } from "../../helpers/buildLabels";
import { useCycleIndexEffect } from "../../hooks/useCycleIndexEffect";
import { useStartAndEndDatesEffect } from "../../hooks/useStartEndDatesEffect";
import { CycleType } from "../../../../types";
import { deCumulArray } from "../../helpers/deCumulArray";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function CumulativeSpending({
  selectedCycle,
  selectedYear,
  currentDateIndex,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
}: CumulativeSpendingProps) {

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

  useCycleIndexEffect(selectedCycle, selectedTimeCycleIndex, currentDateIndex);

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const datesToNumbers = allDaysInMonth.map((day) => day.getDate());

  const labels = buildLabels(
    selectedCycle.value,
    selectedTimeCycleIndex.value,
    datesToNumbers,
    monthsAndDaysArrays
  );

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const { data: cumulArrayData, isSuccess } = useCumulativeSpendingArray(
    startDate.value,
    endDate.value
  );

  const projectionArray = (
    cumulArrayData: number[] | undefined,
    cycle: CycleType
  ) => {
    if (cumulArrayData === undefined) return [];
    const enhancedCumulArray = [...cumulArrayData];
    let upLimit: number;
    //const now = new Date();
    upLimit = getAllDaysInMonth(
      // now.getMonth() + 1,
      // now.getFullYear()
      selectedTimeCycleIndex.value + 1,
      selectedYear.value
    ).length;
    if (cycle === CycleType.Weekly) upLimit = 7;
    let enhancedCumulArrayLength = enhancedCumulArray?.length;

    while (enhancedCumulArrayLength < upLimit - 1) {
      enhancedCumulArray.push(NaN);
      enhancedCumulArrayLength = enhancedCumulArray?.length;
    }
    const forecastValue = calculateForcastValue(cumulArrayData, upLimit);
    enhancedCumulArray.push(forecastValue);
    return enhancedCumulArray;
  };

  const calculateForcastValue = (
    cumulArrayData: number[] | undefined,
    upLimit: number
  ) => {
    const spendingArray = deCumulArray(cumulArrayData);
    const total = spendingArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const average = total / spendingArray.length;
    const forecastValue = average * upLimit;
    return Number(forecastValue.toFixed(2));
  };

  const findLastNumberBeforeNaN = (arr: any) => {
    let lastIndex = -1;
    for (let [index, num] of arr.entries()) {
      if (isNaN(num)) {
        return lastIndex;
      }
      lastIndex = index;
    }
  };

  const expensePoints = cumulArrayData === undefined ? [] : cumulArrayData;
  const projectedArray = projectionArray(cumulArrayData, selectedCycle.value);

  const lastNumberBeforeNaN = findLastNumberBeforeNaN(projectedArray);

  const options = getChartOptions(
    isSuccess,
    cumulArrayData,
    selectedCycle.value,
    labels,
    datesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    lastNumberBeforeNaN,
    currentDateIndex
  );

  const pointRadius: number[] = [];
  const pointBackgroundColor: string[] = [];
 

  const pointRadiusProjection: number[] = [];
  const pointBackgroundColorProjection: string[] = [];
 

  projectedArray.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === expensePoints.length - 1 ||
      indx === 14 ||
      indx === lastNumberBeforeNaN
    ) {
      pointRadiusProjection.push(2);
      pointBackgroundColorProjection.push("#A12BFF");
    } else if (indx === projectedArray.length - 1) {
      pointRadiusProjection.push(2);
      pointBackgroundColorProjection.push("grey");
    } else {
      pointRadiusProjection.push(0);
      pointBackgroundColorProjection.push("transparent");
    }
  });

  
  expensePoints.map((dp, indx) => {
    if (indx === 0 || indx === expensePoints.length - 1 || indx === 14) {
      pointRadius.push(2);
      pointBackgroundColor.push("#A12BFF");
    } else {
      pointRadius.push(0);
      pointBackgroundColor.push("transparent");
    }
  });

  const data = getData(
    labels,
    selectedCycle,
    selectedTimeCycleIndex,
    projectedArray,
    expensePoints,
    currentDateIndex,
    pointRadiusProjection,
    pointRadius,
    pointBackgroundColorProjection,
    pointBackgroundColor,
    isSuccess
  );

  return (
    <StyledCumulativeSpending>
      <Line options={options} data={data} plugins={[noData, ChartDataLabels]} />
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
    </StyledCumulativeSpending>
  );
}
