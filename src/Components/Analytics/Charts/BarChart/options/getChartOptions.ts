import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { CycleType } from "../../../../../types";
import { convertToFullMonthNames } from "../../../helpers/monthlyDataHelpers";

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
  
  function transformDateArray(dateArray: string[]): string[] {
    return dateArray.map((dateString) => {
      const [month, day] = dateString.split(' ');
      return `${day} ${month}`;
    });
  }

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
        yAlign: "top",
        displayColors: false,
        enabled: true,
        callbacks: {
          title: (context: Context[]) => {
            const index = context[0].dataIndex;
            switch (selectedCycle) {
              case CycleType.Monthly:
                return labels[index] + " " + fullMonthName + " " + selectedYear;
              case CycleType.Weekly:
                return transformDateArray(convertToFullMonthNames(monthsAndDaysArrays)[selectedTimeCycleIndex])[index]+ " " +selectedYear;
            }
          },
          label: (context: any) => {
            const value = context.parsed.y;
            return `Total spent:` + ` ` + `${currency}` + `${value}`;
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
        padding: -10,
        formatter: (value:any) => {
          // Check if the value is negative
          if (value < 0) {
            // If negative, format within parentheses
            return "($" + Math.abs(Number(roundThousandsAndMillions(value))) + ")";
          } 
          if (value >= 0) {
            // If non-negative, format normally
            return "$" + roundThousandsAndMillions(value);
          }
          // if(value===0)
          // return ""
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
