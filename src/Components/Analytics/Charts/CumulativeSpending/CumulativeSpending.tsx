import React, { useEffect } from "react";
import { roundThousandsAndMillions } from "../../../../helpers/roundThousandsAndMils";
import { Context } from "chartjs-plugin-datalabels";

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
  // CoreChartOptions,
  // ElementChartOptions,
  // PluginChartOptions,
  // ScaleChartOptions,
  // DatasetChartOptions,
  // LineControllerChartOptions,
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
  getNameForCurrentMonth,
} from "../../helpers/monthlyDataHelpers";
import { formatDateIntoYMD } from "../../helpers/formatDateIntoYMD";
import { months, weekDays } from "../../../../constants/dates";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";

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
}: CumulativeSpendingProps) {

  
  const initialiseSelectedTimeCycle = (cycle: CycleType) => {
    switch (cycle) {
      case CycleType.Monthly:
        return new Date().getMonth(); //start by displaying current month if user selects month
      case CycleType.Weekly:
        return currentDateIndex; //start by displaying current week if user selects week
      default:
        return 0;
    }
  };

  const selectedTimeCycleIndex = useSignal<number>(
    initialiseSelectedTimeCycle(selectedCycle.value)
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

  const firstDayOfMonth = formatDateIntoYMD(allDaysInMonth[0]);
  const lastDayOfMonth = formatDateIntoYMD(
    allDaysInMonth[allDaysInMonth.length - 1]
  );

  //build a fn that decides first and last date based on cycle

  const labels: string[] = datesToNumbers.map((num) =>
    num.toString().padStart(2, "0")
  );
  //const labels: string[] = weekDays

  const { data: cumulArrayData, isSuccess } = useCumulativeSpendingArray(
    firstDayOfMonth,
    lastDayOfMonth
  );

  const date = new Date(selectedYear.value, selectedTimeCycleIndex.value, 1);
  // console.log(selectedTimeCycleIndex.value);
  // console.log(monthsAndDaysArrays)

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);
  //console.log(getNameForCurrentMonth(2023, 1, 1));

  const options = {
    isSuccess: isSuccess,
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "chartArea",
        align: "start",
        labels: {
          usePointStyle: false, // use a square instead of a rectangle
          boxWidth: 10, // set the width of the square
          boxHeight: 10, // set the height of the square
          color: "#858585", // set the color of the square
        },
      },
      title: {
        display: isSuccess && cumulArrayData.length !== 0,
        text: "Cumulative Spending",
        color: "#a1a1a1",
      },

      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            return (
              labels[index] +
              " " +
              fullMonthName +
              " " +
              selectedYear.value.toString()
            );
          },
          label: (context: any) => {
            const value = context.parsed.y;
            return `Cumulative spending: $${value}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 14,
          weight: "bold",
        },

        align: "top",
        padding: 10,
        formatter: (value: number, context: Context) => {
          // Show numeric value over graph for first, middle, and last data points
          if (
            context.dataIndex === 0 ||
            context.dataIndex === 14 ||
            context.dataIndex === context.dataset.data.length - 1
          ) {
            return "$" + roundThousandsAndMillions(value.toString());
          } else {
            return null;
          }
        },
      },
    },

    layout: {
      padding: {
        right: 20,
        top: 20,
        left: 20,
      },
    },
    scales: {
      x: {
        offset: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#DDDDDD",
          font: {
            weight: "bold",
            size: 20,
          },
          callback: (index: number, value: number) => {
            switch (selectedCycle.value) {
              case CycleType.Monthly:
                // show the label for the first and last date of the month
                if (
                  index === 0 ||
                  value + 1 === datesToNumbers[datesToNumbers.length - 1]
                ) {
                  return labels[index];
                }
                // show the label for intervals of 5
                if (parseFloat(labels[index]) % 5 === 0 && value + 2 !== 31) {
                  return Math.floor(parseFloat(labels[index]))
                    .toString()
                    .padStart(2, "0");
                }
                // hide all other labels
                return null;
              case CycleType.Weekly:
                return;
            }
          },
        },
      },
      y: {
        offset: true,
        display: false,

        grid: {
          display: false,
        },
      },
    },
    elements: {
      point: {
        radius: 3,
        borderWidth: 3,
        hitRadius: 10,
        hoverRadius: 10,
        pointStyle: "circle",
        pointLabelFontSize: 14,
        pointLabelFontWeight: "bold",
      },
    },
  } as any;

  const gradient = document
    .createElement("canvas")
    .getContext("2d") as CanvasRenderingContext2D;

  const linearGradient = gradient.createLinearGradient(0, 0, 0, 300);
  linearGradient.addColorStop(0, "rgba(153, 30, 251, 0.25)");
  linearGradient.addColorStop(1, "rgba(217, 217, 217, 0)");

  const expensePoints = cumulArrayData === undefined ? [] : cumulArrayData;

  const pointRadius: number[] = [];
  const pointBackgroundColor: string[] = [];

  const expensePointsWeekly = [2, 12, 20, 39, 56, 69, 100];

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
        />
      </div>
    </StyledCumulativeSpending>
  );
}
