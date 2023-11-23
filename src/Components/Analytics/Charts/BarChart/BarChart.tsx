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

export function BarChart() {
  const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );
  const dates = getAllDaysInMonth(3, 2021);
  const dateNumbers = dates.map((date) => date.getDate());

  const period = "April";
  const year = "2021";
  const currency = "$";

  const createGroupedLabels = (dateNumbers: number[]) => {
    const groupedLabels: string[] = [];
    dateNumbers.forEach((dn, index) => {
      if (index % 7 === 0) {
        const start = dn;
        const end = Math.min(dn + 6, dateNumbers[dateNumbers.length - 1]);
        groupedLabels.push(
          `${start.toString().padStart(2, "0")}-${end
            .toString()
            .padStart(2, "0")}`
        );
      }
    });
    return groupedLabels;
  };
  const groupedLabels = createGroupedLabels(dateNumbers);

  const options = {
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
            return groupedLabels[index] + " " + period + " " + year;
          },
          label: (context: any) => {
            const value = context.parsed.y;
          return  `Total spent:` + ` ` + `${currency}` + `${value}`
          },
        }
        
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

;

  const getRandomNumbers = (length: number, min: number, max: number) => {
    const numbers = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.push(randomNumber);
    }
    return numbers;
  };

  const dataPoints = getRandomNumbers(31, 0, 1000); // This is supposed to be the total amount spent per calendar day

  const sumPerWeek = (arr: any) => {
    const newArr = [];
    const num_of_groups = Math.floor(arr.length / 7);
    for (let i = 0; i < num_of_groups; i++) {
      // Calculate the start and end indices for each group
      const start = i * 7;
      const end = start + 6;

      // Sum the numbers within the current group
      const sum = arr
        .slice(start, end + 1)
        .reduce((acc: number, num: number) => acc + num, 0);

      // Add the sum to the new array
      newArr.push(sum);
    }
    // Add the remaining numbers (if any) to the new array
    if (arr.length % 7 !== 0) {
      const remainingStart = num_of_groups * 7;
      const remainingEnd = arr.length - 1;
      const remainingSum = arr
        .slice(remainingStart, remainingEnd + 1)
        .reduce((acc: number, num: number) => acc + num, 0);
      newArr.push(remainingSum);
    }
    return newArr;
  };

  const groupedDataPoints = sumPerWeek(dataPoints);

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
    <Bar
      style={{ width: "100%", height: "330px" }}
      options={options}
      data={data}
      plugins={[ChartDataLabels]}
    />
  );
}
