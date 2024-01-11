import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { CycleType } from "../../../../../types";
import { shortWeekdays } from "../../../../../constants/dates";
import { enhanceWeekDays } from "../../../helpers/enhanceWeekDays";

export const getChartOptions = (
  isSuccess: boolean,
  totalLentExt: number[] | undefined,
  totalBorrowedExt: number[] | undefined,
  selectedCycle: CycleType,
  labels: string[],
  enhancedDatesToNumbers: number[],
  selectedYear: number,
  selectedTimeCycleIndex: number,
  currentDateIndex: number,
  hitRadius: number[],
  fractalFactor: number
) => {
  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);
 
  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);

  const enhancedWeekDays = enhanceWeekDays(shortWeekdays, fractalFactor);

  return {
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
          },
          label: (context: any) => {
            const value = context.parsed.y;
            if (context.dataset.label === "Total Lent") {
              return `Total Lent:` + ` ` + `${"currency"}` + `${value}`;
            } else {
              return `Total Borrowed:` + ` ` + `${"currency"}` + `${value}`;
            }
          },
        },
      },
      datalabels: {
        display: true,
        // color: "white",
        font: {
          size: 14,
          weight: "bold",
        },
        color: (context: Context) => {
          if (context.dataset.label === "Total Lent") {
            return "#317E24";
          } else {
            return "#FF3D3D";
          }
        },

        align: (context: Context) => {
          if (totalLentExt !== undefined && totalBorrowedExt !== undefined)
            if (
              context.dataset.label === "Total Lent" &&
              totalLentExt[context.dataIndex] >
                totalBorrowedExt[context.dataIndex]
            ) {
              return "top";
            } else if (
              context.dataset.label === "Total Lent" &&
              totalLentExt[context.dataIndex] <
                totalBorrowedExt[context.dataIndex]
            )
              return "bottom";
            else if (
              context.dataset.label === "Total Borrowed" &&
              totalLentExt[context.dataIndex] <
                totalBorrowedExt[context.dataIndex]
            ) {
              return "top";
            } else return "bottom";
          return;
        },
        padding: 5,
        formatter: (value: number, context: Context) => {
          // Show price label for first, middle, and last data points
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1 ||
            enhancedDatesToNumbers[context.dataIndex] === 15
          ) {
            return "$" + roundThousandsAndMillions(value.toString());
            // } else if (
            //   context.dataIndex === Math.floor(context.dataset.data.length / 2)

            // ) {
            //   if (enhancedDatesToNumbers[context.dataIndex] % 1 === 0) {
            //     return "$" + roundThousandsAndMillions(value.toString());
            //   } else {
            //     return (
            //       "$" +
            //       roundThousandsAndMillions(
            //         context.dataset.data[context.dataIndex + 1]?.toString()
            //       )
            //     );
            //   }
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
                // show x axis values for the first and last date of the month
                if (
                  index === 0 ||
                  index === enhancedDatesToNumbers.length - 1
                ) {
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
                // hide all other x axis values
                return null;
              case CycleType.Weekly:
                if (
                  index === 0 ||
                  index === enhancedWeekDays.length - 1 ||
                  index % 5 === 0
                )
                  return enhancedWeekDays[index];
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
        hitRadius: hitRadius,
        hoverRadius: 10,
        pointStyle: "circle",
        pointLabelFontSize: 14,
        pointLabelFontWeight: "bold",
      },
    },
  } as any;
};
