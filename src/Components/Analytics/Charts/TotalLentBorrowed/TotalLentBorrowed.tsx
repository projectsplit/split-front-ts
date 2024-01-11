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
import {  getAllDaysInMonth } from "../../helpers/monthlyDataHelpers";
import { buildMidPoints } from "../../helpers/buildMidPoints";
import { getChartOptions } from "./options/getChartOptions";
import { getData } from "./data/getData";
import { useCycleIndexEffect } from "../../hooks/useCycleIndexEffect";

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

export function TotalLentBorrowed({
  selectedCycle,
  selectedYear,
  currentDateIndex,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
}: TotalLentBorrowedProps) {


  const fractalFactor = 4

  useCycleIndexEffect(selectedCycle, selectedTimeCycleIndex, currentDateIndex);

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const enhancedDatesToNumbers = buildMidPoints(
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
  //   1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222,
  //   250.36, 310, 400, 420, 450, 500, 540, 690, 940, 952, 1000, 1045.36,
  // ];
  // const totalLent = [
  //   2, 5, 10, 75, 80, 80, 100, 100, 100, 110, 110, 120, 130, 145, 200, 250,
  //   250.36, 300, 312, 400, 500, 500, 520, 610, 620, 1200, 1300, 1445.36,
  // ];

  const totalLent = [ 2, 50, 100, 750, 800, 800, 1000]
  const totalBorrowed =[7, 150, 10, 15, 25, 35, 150]

  const totalLentExt = buildMidPoints(totalLent,fractalFactor);
  const totalBorrowedExt = buildMidPoints(totalBorrowed,fractalFactor);

 
  const pointRadius: number[] = [];
  const hitRadius: number[] = []; //determines which cicles will be highlited on hover.
  const pointBackgroundColorTotalLent: string[] = [];
  const pointBackgroundColorTotalLentTotalBorrowed: string[] = [];

  totalLentExt.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === totalLentExt.length - 1 ||
      enhancedDatesToNumbers[indx] === 15//createConditionForMiddlePoint(totalLentExt.length, indx)
      
    ) {
      pointRadius.push(2);
      pointBackgroundColorTotalLent.push("#317E24");
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLent.push("transparent");
    }
    if ( enhancedDatesToNumbers[indx] % 1 === 0) {
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
      pointRadius.push(2);
      pointBackgroundColorTotalLentTotalBorrowed.push("#FF3D3D");
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLentTotalBorrowed.push("transparent");
    }
    if ( enhancedDatesToNumbers[indx] % 1 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });
  
  console.log(hitRadius)
  const isSuccess: boolean = true;
  
  const options = getChartOptions(
    isSuccess,
    totalLentExt,
    totalBorrowedExt,
    selectedCycle.value,
    labels,
    enhancedDatesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    currentDateIndex,
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
        />
      </div>
    </StyledTotalLentBorrowed>
  );
}
