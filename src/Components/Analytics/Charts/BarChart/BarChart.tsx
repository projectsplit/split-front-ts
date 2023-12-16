import React from "react";
import { roundThousandsAndMillions } from "../../../../helpers/roundThousandsAndMils";
import { Context } from "chartjs-plugin-datalabels";
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
import { months } from "../../../../constants/dates";
import { BarChartProps } from "../../../../interfaces";
import { getAllDaysInMonth } from "../../helpers/monthlyDataHelpers";
import { createGroupedLabels } from "../../helpers/createGroupedLabels";
import { getChartOptions } from "./options/getChartOptions";
import { groupExpensesPerWeek } from "../../helpers/groupExpensesPerWeek";

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


  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const datesToNumbers = allDaysInMonth.map((day) => day.getDate());

  const groupedLabels = createGroupedLabels(datesToNumbers);

  const options = getChartOptions(
    // isSuccess,
    // cumulArrayData,
    selectedCycle.value,
    groupedLabels,
    datesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    "USD"
  );

  const getRandomNumbers = (length: number, min: number, max: number) => {
    const numbers = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(randomNumber);
    }
    return numbers;
  };

  const dataPoints = getRandomNumbers(31, -500, 1000); // This is supposed to be the total amount spent per calendar day

  const groupedDataPoints = groupExpensesPerWeek(dataPoints);

  const data = {
    labels: groupedLabels,
    datasets: [
      {
        label: "cumulative spending",
        data: groupedDataPoints,
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
      <Bar
        style={{ width: "100%", height: "330px" }}
        options={options}
        data={data}
        plugins={[ChartDataLabels]}
      />
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
