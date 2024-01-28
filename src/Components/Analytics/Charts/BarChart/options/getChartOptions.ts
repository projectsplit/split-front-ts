import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { CycleType } from "../../../../../types";
import { convertToFullMonthNames } from "../../../helpers/monthlyDataHelpers";
import { swapMonthDayToDayMonth } from "../../../helpers/swapMonthDayToDayMonth";
import { months } from "../../../../../constants/dates";

export const getChartOptions = (
  isSuccess: boolean,
  monthsAndDaysArrays: string[][],
  selectedCycle: CycleType,
  labels: string[],
  datesToNumbers: number[],
  selectedYear: number,
  selectedTimeCycleIndex: number,
  currency: string
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
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      tooltip: {
        yAlign: (ctx: any) => {
          // Adjust yAlign based on data value
          if(ctx.tooltip.dataPoints[0].raw>0) return 'top'
          return 'bottom'
        },
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            switch (selectedCycle) {
              case CycleType.Monthly:
                return labels[index] + " " + fullMonthName + " " + selectedYear;
              case CycleType.Weekly:
                return swapMonthDayToDayMonth(convertToFullMonthNames(monthsAndDaysArrays)[selectedTimeCycleIndex])[index] + " " + selectedYear;
              case CycleType.Annually:
                return months[index] + " " + selectedYear;
            }
          },
          label: (context: any) => {
            const value = context.parsed.y;
            return value >= 0 ?
              `Total spent:` + ` ` + `${currency}` + `${value}`
              :
              `Total received:` + ` ` + `${currency}` + `${-value}`;
          },
        },
      },
      datalabels: {
        display: true,
        color: "white",
        font: {
          size: 12, //TODO adjust based on screen size
          weight: "bold",
        },
        anchor: (context: any) => {
          const anchor = []
          if (context.dataset.data[context.dataIndex] >= 0) {
            anchor.push('end')
          } else {
            anchor.push('start')
          }
          return anchor;
        },
        align: (context: any) => {
          const align = []
          if (context.dataset.data[context.dataIndex] >= 0) {
            align.push('top')
          } else {
            align.push('bottom')
          }
          return align;
        },

        padding: -10,
        formatter: (value: any) => {
          if (value < 0) {
            // If negative, format within parentheses
            return "($" + Math.abs(Number(roundThousandsAndMillions(value))) + ")";
          }
          if (value > 0) {
            // If non-negative, format normally
            return "$" + roundThousandsAndMillions(value);
          }
          if (value === 0) return ""
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
            size: 20, //TODO adjust based on screen size
          },
          callback: (index: number, value: number) => {
            return labels[index];
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
  } as any;
};
