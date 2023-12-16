import { Context } from "chartjs-plugin-datalabels/types/context";
import { roundThousandsAndMillions } from "../../../../../helpers/roundThousandsAndMils";
import { CycleType } from "../../../../../types";
import { shortWeekdays } from "../../../../../constants/dates";


export const getChartOptions = (
//   isSuccess: boolean,
//   cumulArrayData: number[]|undefined,
  selectedCycle: CycleType,
  labels: string[],
  datesToNumbers: number[],
  selectedYear: number,
  selectedTimeCycleIndex:number,
  currency:string
) => {

  const date = new Date(selectedYear, selectedTimeCycleIndex, 1);

  const dateOptions: Intl.DateTimeFormatOptions = { month: "long" };

  const fullMonthName = date.toLocaleDateString("en-US", dateOptions);

  return {
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
            return labels[index] + " " + fullMonthName + " " + selectedYear;
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
        formatter: (value: any) => {
          return "$" + roundThousandsAndMillions(value);
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
