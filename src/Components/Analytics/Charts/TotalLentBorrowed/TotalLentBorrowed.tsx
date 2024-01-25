import React from "react";
import { StyledTotalLentBorrowed } from "./TotalLentBorrowe.styled";

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
import { noData } from "../plugins/noData";
import Carousel from "../../Carousel/Carousel";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";
import { months } from "../../../../constants/dates";
import { TotalLentBorrowedProps } from "../../../../interfaces";
import { getAllDaysInMonth } from "../../helpers/monthlyDataHelpers";
import { enhanceNumberArray } from "../../helpers/enhanceNumberArray";
import { getChartOptions } from "./options/getChartOptions";
import { getData } from "./data/getData";
import { useCycleIndexEffect } from "../../hooks/useCycleIndexEffect";
import { useStartAndEndDatesEffect } from "../../hooks/useStartEndDatesEffect";
import { buildLabels } from "../../helpers/buildLabels";
import { useSignal } from "@preact/signals-react";
import { buildStartAndEndDates } from "../../helpers/buildStartAndEndDates";
import useTotalLentBorrowedArrays from "../../../../hooks/useTotalLentBorrowedArrays";
//TODO fast click to the left by choosing weekly. Legends are flashing
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

export function TotalLentBorrowed({
  selectedCycle,
  selectedYear,
  currentWeekIndex,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
}: TotalLentBorrowedProps) {
  const fractalFactor = 4;

  useCycleIndexEffect(selectedCycle, selectedTimeCycleIndex, currentWeekIndex,selectedYear.value);

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

  //const totalLent = [1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222, 250.36, 310, 400, 420, 450, 500, 540, 690, 940, 952, 1000, 1045.36]
  // const totalBorrowed = [
  //   1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36,
  //   218.36,];
  // const totalLent = [
  //   2, 5, 10, 75, 80, 80, 100, 100, 100, 110, 110, 120, 130, 145, 240,
  // 245];

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const totalLent2 = [2, 50, 100, 750, 800, 800, 1000];
  const totalBorrowed2 = [7, 150, 10, 15, 25, 35, 150];

  const { data: totalLentBorrowed, isSuccess } = useTotalLentBorrowedArrays(
    startDate.value,
    endDate.value
  );

  const totalLent =
    totalLentBorrowed?.totalLent === undefined
      ? []
      : totalLentBorrowed.totalLent;
  const totalBorrowed =
    totalLentBorrowed?.totalBorrowed === undefined
      ? []
      : totalLentBorrowed.totalBorrowed;

  const totalLentExt = enhanceNumberArray(totalLent, fractalFactor).filter((element) => element !== undefined);
  const totalBorrowedExt = enhanceNumberArray(totalBorrowed, fractalFactor).filter((element) => element !== undefined);


  const pointRadius: number[] = [];
  const hitRadius: number[] = []; //determines which cicles will be highlited on hover.
  const pointBackgroundColorTotalLent: string[] = [];
  const pointBackgroundColorTotalLentTotalBorrowed: string[] = [];

  totalLentExt.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === totalLentExt.length - 1 ||
      enhancedDatesToNumbers[indx] === 15 //createConditionForMiddlePoint(totalLentExt.length, indx)
    ) {
      if (
        enhancedDatesToNumbers[indx] === 15 &&
        (enhancedDatesToNumbers[totalLentExt.length - 1] === 14 ||
          enhancedDatesToNumbers[totalLentExt.length - 1] === 16) //condition to not show 15th and 16th consecutive data points
      ) {
        pointRadius.push(0);
        pointBackgroundColorTotalLent.push("transparent");
      } else {
        pointRadius.push(2);
        pointBackgroundColorTotalLent.push("#317E24");
      }
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLent.push("transparent");
    }
    if (enhancedDatesToNumbers[indx] % 1 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });

  totalBorrowedExt.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === totalLentExt.length - 1 ||
      enhancedDatesToNumbers[indx] === 15
    ) {
      if (
        enhancedDatesToNumbers[indx] === 15 &&
        (enhancedDatesToNumbers[totalLentExt.length - 1] === 14 ||
          enhancedDatesToNumbers[totalLentExt.length - 1] === 16) //condition to not show 15th and 16th consecutive data points
      ) {
        pointRadius.push(0);
        pointBackgroundColorTotalLent.push("transparent");
      } else {
        pointRadius.push(2);
        pointBackgroundColorTotalLentTotalBorrowed.push("#FF3D3D");
      }
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLentTotalBorrowed.push("transparent");
    }
    if (enhancedDatesToNumbers[indx] % 1 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });

  const options = getChartOptions(
    isSuccess,
    totalLentExt,
    totalBorrowedExt,
    selectedCycle.value,
    labels,
    enhancedDatesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    currentWeekIndex,
    hitRadius,
    fractalFactor
  );

  const data = getData(
    totalLentExt,
    totalBorrowedExt,
    labels,
    pointRadius,
    pointBackgroundColorTotalLent,
    pointBackgroundColorTotalLentTotalBorrowed
  );

  return (
    <StyledTotalLentBorrowed>
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
    </StyledTotalLentBorrowed>
  );
}
