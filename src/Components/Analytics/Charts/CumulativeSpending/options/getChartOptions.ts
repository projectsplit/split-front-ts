import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { CycleType } from "../../../../../types";
import { months, shortWeekdays } from "../../../../../constants/dates";
import { enhanceStringArray } from "../../../helpers/enhanceStringArray";
import { generateYearsArray } from "../../../helpers/generateYearsArray";

export const getChartOptions = (
  isSuccess: boolean,
  cumulArrayData: number[] | undefined,
  selectedCycle: CycleType,
  labels: string[],
  enhancedDatesToNumbers: number[],
  selectedYear: number,
  selectedTimeCycleIndex: number,
  lastNumberBeforeNaN: number | undefined,
  currentWeekIndex: number,
  hitRadius: number[],
  fractalFactor: number
) => {
  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);

  const enhancedWeekDays = enhanceStringArray(shortWeekdays, fractalFactor);

  const abbreviatedMonths = months.map((month) => month.slice(0, 3))

  const enhancedAbbreviatedMonths = enhanceStringArray(abbreviatedMonths, fractalFactor);

  return {
    animation: {
      duration: 500,
      onProgress: function (animation: any) { //clears the top left part of the canvas where animation of datalabel is not shown correctly when moving from 30 to 31 datapoints
        const chartInstance = animation.chart;
        const ctx = chartInstance.ctx;
        const width = chartInstance.width;
        const height = chartInstance.height;
        const topLeftWidth = width * 0.025;
        const topLeftHeight = height * 0.025;
        // Clear the canvas
        ctx.clearRect(0, 0, topLeftWidth, topLeftHeight);
      }
    },
    isSuccess: isSuccess,
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      legend: {
        onClick: function (e: Event) {
          if (e.stopPropagation)
            e.stopPropagation();
        },
        display: isSuccess && cumulArrayData?.length !== 0,
        position: "top",
        align:"start",
        labels: {
          usePointStyle: false, // use a square instead of a rectangle
          boxWidth: 10, // set the width of the square
          boxHeight: 10, // set the height of the square
          color: "#858585", // set the color of the square
        },
      },
      title: {
        display: false, //isSuccess && cumulArrayData?.length !== 0,
        text: "Total Spending",
        color: "#a1a1a1",
      },
      customCanvasBackgroundColor: {
        color: "#27273C",
      },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            if (selectedCycle === CycleType.Monthly)
              return (
                labels[index] +
                " " +
                fullMonthName +
                " " +
                selectedYear.toString()
              );
            if (selectedCycle === CycleType.Weekly)
              return labels[index] + " " + selectedYear.toString();
            if (selectedCycle === CycleType.Annually)
              return labels[index] + " " + selectedYear.toString();
          },
          label: (context: any) => {
            const value = context.parsed.y;

            switch (selectedCycle) {
              case CycleType.Monthly:
                if (
                  selectedTimeCycleIndex === new Date().getMonth() &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return `Forecast Spending: $${value}`;
                }
                return `Total Spending: $${value}`;
              case CycleType.Weekly:
                if (
                  selectedTimeCycleIndex === currentWeekIndex &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return `Forecast Spending: $${value}`;
                }
                return `Total Spending: $${value}`;
              case CycleType.Annually:
                if (
                  selectedTimeCycleIndex === generateYearsArray().indexOf(selectedYear) &&
                  context.dataIndex === context.dataset.data.length - 1
                ) {
                  return `Forecast Spending: $${value}`;
                }
                return `Total Spending: $${value}`;

              default:
                return `Total Spending: $${value}`;
            }
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
            context.dataIndex === context.dataset.data.length - 1 ||
            enhancedDatesToNumbers[context.dataIndex] === 15 ||
            lastNumberBeforeNaN === context.dataIndex
          ) {
            if (value < 0) {
              // If negative, format within parentheses
              return (
                "($" +
                Math.abs(Number(roundThousandsAndMillions(value.toString()))) +
                ")"
              );
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
                // show the x axis for the first and last date of the month
                if (index === 0 || index === enhancedDatesToNumbers.length - 1) {
                  return labels[index];
                }
                // show x axis values for intervals of 5
                if (
                  parseFloat(labels[index]) % 5 === 0 &&
                  enhancedDatesToNumbers[index + fractalFactor + 1] !== 31
                ) {
                  return Math.floor(parseFloat(labels[index]))
                    .toString()
                    .padStart(2, "0");
                }

                break;

              case CycleType.Weekly:

                if (
                  index === 0 ||
                  index === enhancedWeekDays.length - 1 ||
                  index % (fractalFactor + 1) === 0
                ) {
                  return enhancedWeekDays[index];
                }
                break;

              case CycleType.Annually:

                if (
                  index === 0 ||
                  index === enhancedAbbreviatedMonths.length - 1 ||
                  index % (fractalFactor + 1) === 0
                ) {
                  return enhancedAbbreviatedMonths[index];
                }
                break;
            }
          },
        },
      },
      y: {
        offset: true,
        display: false,
        grid: {
          display: false,
        }
      },
    },
    elements: {
      point: {
        radius: 3,
        borderWidth: 3,
        hitRadius: hitRadius,
        hoverRadius: 10,
        pointStyle: "circle",
        pointLabelFontSize: 14,
        pointLabelFontWeight: "bold",
      },
    },
  } as any;
};