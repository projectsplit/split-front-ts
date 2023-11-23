import React, { CanvasHTMLAttributes } from "react";
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
  CoreChartOptions,
  ElementChartOptions,
  PluginChartOptions,
  ScaleChartOptions,
  DatasetChartOptions,
  LineControllerChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { _DeepPartialObject } from "chart.js/dist/types/utils";

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

export function CumulativeSpending() {
  // type _DeepPartialObject<T> = {
  //   [P in keyof T]?: T[P] extends object ? _DeepPartialObject<T[P]> : T[P];
  // };

  // type YourChartOptionsType = _DeepPartialObject<
  //   CoreChartOptions<"line"> &
  //   ElementChartOptions<"line"> &
  //   PluginChartOptions<"line"> &
  //   DatasetChartOptions<"line"> &
  //   ScaleChartOptions<any> &  // Replace 'any' with the specific type you want for ScaleChartOptions
  //   LineControllerChartOptions
  // > | undefined;

  const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );

  const dates = getAllDaysInMonth(2, 2021);

  const datesToNumbers = dates.map((date) => date.getDate());

  const period = "April";
  const year = "2021";

  const labels: string[] = datesToNumbers.map((num) =>
    num.toString().padStart(2, "0")
  );

  const options = {
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "chartArea",
        labels: {
          usePointStyle: false, // use a square instead of a rectangle
          boxWidth: 10, // set the width of the square
          boxHeight: 10, // set the height of the square
          color: "#DDDDDD", // set the color of the square
        },
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },

      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            return labels[index] + " " + period + " " + year;
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
          // Show data label for first, middle, and last data points
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1
          ) {
            return "$" + roundThousandsAndMillions(value.toString());
          } else if (
            Math.floor(context.dataset.data.length / 2) >
              Math.floor(datesToNumbers.length) / 2 ||
            context.dataIndex === Math.floor(datesToNumbers.length) / 2
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
            // show the label for the first and last date of the month
            if (
              index === 0 ||
              value === datesToNumbers[datesToNumbers.length - 1] - 1
            ) {
              return labels[index];
            }
            // show the label for intervals of 5
            if (parseFloat(labels[index]) % 5 === 0) {
              return Math.floor(parseFloat(labels[index]))
                .toString()
                .padStart(2, "0");
            }
            // hide all other labels
            return null;
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

  const expensePoints = [
    2, 12, 20, 39, 56, 69, 100, 102, -120, 130, 150, 180, 190, 200, 210.36, 222,
    250.36, 310, 400, 420, 450, 500, 540, 690, 780, 952, 1000, 1045.36,
  ];

  const pointRadius: number[] = [];
  const pointBackgroundColor: string[] = [];

  expensePoints.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === expensePoints.length - 1 ||
      indx === expensePoints.length / 2
    ) {
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
    <div style={{ width: "100%", height: "330px" }}>
      <Line options={options} data={data} plugins={[ChartDataLabels]} />
    </div>
  );
}
