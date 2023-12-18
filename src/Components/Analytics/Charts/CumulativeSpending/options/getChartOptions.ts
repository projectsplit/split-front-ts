import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { CycleType } from "../../../../../types";
import { shortWeekdays } from "../../../../../constants/dates";

export const getChartOptions = (
  isSuccess: boolean,
  cumulArrayData: number[]|undefined,
  selectedCycle: CycleType,
  labels: string[],
  datesToNumbers: number[],
  selectedYear: number,
  selectedTimeCycleIndex:number
) => {

  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);

  return {
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
        display: isSuccess && cumulArrayData?.length !== 0,
        text: "Cumulative Spending",
        color: "#a1a1a1",
      },
      customCanvasBackgroundColor: {
        color: '#27273C',
      },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            if(selectedCycle===CycleType.Monthly)
            return (
              labels[index] +
              " " +
              fullMonthName +
              " " +
              selectedYear.toString()
            );
            if(selectedCycle===CycleType.Weekly)
            return (
              labels[index] +
              " " +
              selectedYear.toString()
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
            if (value < 0) {
              // If negative, format within parentheses
              return "($" + Math.abs(Number(roundThousandsAndMillions(value.toString()))) + ")";
            } else {
              return "$" + roundThousandsAndMillions(value.toString());
            }
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
            switch (selectedCycle) {
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
                return shortWeekdays[index];
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
};