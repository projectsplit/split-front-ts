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
import { noData } from "../plugins/noData";
import {
  getAllDaysInMonth
} from "../../helpers/monthlyDataHelpers";
import { months } from "../../../../constants/dates";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";
import { buildStartAndEndDates } from "../../helpers/buildStartAndEndDates";
import { getChartOptions } from "./options/getChartOptions";
import { getData } from "./data/getData";
import { buildLabels } from "../../helpers/buildLabels";
import { useCycleIndexEffect } from "../../hooks/useCycleIndexEffect";
import { useStartAndEndDatesEffect } from "../../hooks/useStartEndDatesEffect";
import { CycleType } from "../../../../types";
import { deCumulArray } from "../../helpers/deCumulArray";
import { enhanceNumberArray } from "../../helpers/enhanceNumberArray";
import { generateYearsArray } from "../../helpers/generateYearsArray";

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
  currentWeekIndex,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
}: CumulativeSpendingProps) {
  const fractalFactor = 1;

  
  //useCycleIndexEffect(selectedCycle, selectedTimeCycleIndex, currentWeekIndex, selectedYear.value);
  
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

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const enhancedDatesToNumbers = enhanceNumberArray(
    allDaysInMonth.map((date) => date.getDate()),
    fractalFactor
  );

  const labels = buildLabels(
    selectedCycle.value,
    selectedTimeCycleIndex.value,
    enhancedDatesToNumbers,
    monthsAndDaysArrays,
    fractalFactor
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
    if (cumulArrayData.length === 0) return [];

    const enhancedCumulArray = [...cumulArrayData];
    let upLimit = 0;
    //const now = new Date();
    if (cycle === CycleType.Monthly) upLimit = getAllDaysInMonth(
      selectedTimeCycleIndex.value + 1,
      selectedYear.value
    ).length;
    if (cycle === CycleType.Weekly) upLimit = 7;
    if (cycle === CycleType.Annually) upLimit = 12;

    let enhancedCumulArrayLength = enhancedCumulArray?.length;

    while (enhancedCumulArrayLength < upLimit - 1) {
      enhancedCumulArray.push(NaN);
      enhancedCumulArrayLength = enhancedCumulArray?.length;
    }
    const forecastValue = calculateForcastValue(cumulArrayData, upLimit);

    enhancedCumulArray.push(forecastValue);
    const enhancedCumulArrayWithMidPoints = enhanceNumberArray(
      enhancedCumulArray,
      1
    );

    const hasNaN = enhancedCumulArrayWithMidPoints.some(Number.isNaN);
    if (!hasNaN)
      enhancedCumulArrayWithMidPoints[
        enhancedCumulArrayWithMidPoints.length - 2
      ] = NaN;

    return enhancedCumulArrayWithMidPoints;
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

  // const isSuccess = true;
  // const cumulArrayData = [30, 30, 30, 33, 34,]
  // const cumulArrayData = [
  //   1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222,
  //   250.36, 310, 400, 420, 450, 500, 540, 690, 940, 952, 1000, 1045.36, 1200,
  // ];
  const expensePoints = cumulArrayData === undefined ? [] : cumulArrayData;
  const projectedArray = projectionArray(cumulArrayData, selectedCycle.value);
  //const projectedArray2 =  [30, 30, 30, 33, 34, 35,38.5]
  //const projectedArray = buildMidPoints(projectedArray2,1)
  //projectedArray[11]=NaN

  const lastNumberBeforeNaN = findLastNumberBeforeNaN(projectedArray);

  const pointRadius: number[] = [];
  const pointBackgroundColor: string[] = [];

  const pointRadiusProjection: number[] = [];
  const pointBackgroundColorProjection: string[] = [];
  const hitRadius: number[] = [];

  projectedArray.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === projectedArray.length - 1 ||
      enhancedDatesToNumbers[indx] === 15 || //does not affect annual or weekly as they are 12 and 7 rsptctvly
      indx === lastNumberBeforeNaN
    ) {
      pointRadiusProjection.push(2);
      pointBackgroundColorProjection.push("#A12BFF");
    } else {
      pointRadiusProjection.push(0);
      pointBackgroundColorProjection.push("transparent");
    }
    if (enhancedDatesToNumbers[indx] % 1 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });
  if (projectedArray.some((p) => isNaN(p))) {
    pointBackgroundColorProjection[projectedArray.length - 1] = "grey";
  }

  // expensePoints.map((dp, indx) => {
  //   if (indx === 0 || indx === expensePoints.length - 1 || indx === 14) {
  //     pointRadius.push(2);
  //     pointBackgroundColor.push("#A12BFF");
  //   } else {
  //     pointRadius.push(0);
  //     pointBackgroundColor.push("transparent");
  //   }
  // });

  const options = getChartOptions(
    isSuccess,
    cumulArrayData,
    selectedCycle.value,
    labels,
    enhancedDatesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    lastNumberBeforeNaN,
    currentWeekIndex,
    hitRadius,
    fractalFactor
  );

  const data = getData(
    labels,
    selectedCycle,
    selectedTimeCycleIndex,
    projectedArray,
    expensePoints,
    currentWeekIndex,
    pointRadiusProjection,
    pointRadius,
    pointBackgroundColorProjection,
    pointBackgroundColor,
    isSuccess,
    selectedYear.value
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
          selectedYear={selectedYear}
        />
      </div>
    </StyledCumulativeSpending>
  );
}
