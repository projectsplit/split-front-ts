import React, { useEffect } from "react";
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
import { CycleType } from "../../../../types";
import { noData } from "../plugins/noData";
import {
  getAllDaysInMonth,
} from "../../helpers/monthlyDataHelpers";
import { months } from "../../../../constants/dates";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";
import { buildStartAndEndDates } from "../../helpers/buildStartAndEndDates";
import { getChartOptions } from "./options/getChartOptions";
import { buildLabels } from "../../helpers/buildLabels";

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
  selectedTimeCycleIndex
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

  useEffect(() => {
    if (selectedCycle.value === CycleType.Monthly)
      selectedTimeCycleIndex.value = new Date().getMonth();

    if (selectedCycle.value === CycleType.Weekly)
      selectedTimeCycleIndex.value = currentDateIndex;
  }, [selectedCycle.value]);

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
  
  useEffect(() => {
    const startAndEndDates = buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear
    );
    startDate.value = startAndEndDates[0];
    endDate.value = startAndEndDates[1];
  }, [selectedTimeCycleIndex.value]);

  const { data: cumulArrayData, isSuccess } = useCumulativeSpendingArray(
    startDate.value,
    endDate.value
  );

  const options = getChartOptions(
    isSuccess,
    cumulArrayData,
    selectedCycle.value,
    labels,
    datesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value
  );

  const gradient = document
    .createElement("canvas")
    .getContext("2d") as CanvasRenderingContext2D;

  const linearGradient = gradient.createLinearGradient(0, 0, 0, 300);
  linearGradient.addColorStop(0, "rgba(153, 30, 251, 0.25)");
  linearGradient.addColorStop(1, "rgba(217, 217, 217, 0)");

  const expensePoints = cumulArrayData === undefined ? [] : cumulArrayData;

  const pointRadius: number[] = [];
  const pointBackgroundColor: string[] = [];

  expensePoints.map((dp, indx) => {
    if (indx === 0 || indx === expensePoints.length - 1 || indx === 14) {
      pointRadius.push(2);
      pointBackgroundColor.push("#A12BFF");
    } else {
      pointRadius.push(0);
      pointBackgroundColor.push("transparent");
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cumulative Spending",
        data: expensePoints,
        borderColor: "#A12BFF",
        backgroundColor: linearGradient,
        fill: true,
        tension: 0.2,
        borderWidth: 2,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColor,
      },
    ],
  };

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
