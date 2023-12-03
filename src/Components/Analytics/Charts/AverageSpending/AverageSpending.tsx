import { roundThousandsAndMillions } from "../../../../helpers/roundThousandsAndMils";
import { Context } from "chartjs-plugin-datalabels";
import React from "react";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

export function AverageSpending() {
  const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );

  const dates = getAllDaysInMonth(2, 2021);
  const datesToNumbers = dates.map((date) => date.getDate());
  
  const period = "April";
  const year = "2021";
  const currency = "$";
  //Add another grey legend for forecast (projection)

  const labels: string[] = datesToNumbers.map((num) =>
    num.toString().padStart(2, "0")
  );

  const cumulativeAverageArrayGenerator = (
    averageSpending: any,
    numOfDaysToProject: number
  ) => {
    const cumulativeAvgArr = [];
    cumulativeAvgArr[0] = averageSpending;
    for (let i = 1; i < numOfDaysToProject; i++) {
      cumulativeAvgArr[i] = cumulativeAvgArr[i - 1] + averageSpending;
    }
    return cumulativeAvgArr;
  };

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
            const index = context.dataIndex;
            const isLastPoint = index === context.dataset.data.length - 1;

            if (isLastPoint) {
              const value = context.parsed.y;
              return `Spending Forecast:` + ` ` + `${currency}` + `${value}`;
            } else {
              const value = context.parsed.y;
              return `Average spent:` + ` ` + `${currency}` + `${value}`;
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
        formatter: (value: any, context: any) => {
          // Show data label for first, middle, and last data points
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1 ||
            findLastNumberBeforeNaN(dataPoints3) === context.dataIndex
          ) {
            return currency + roundThousandsAndMillions(value);
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

  const dataPoints = cumulativeAverageArrayGenerator(22.9770731707317, 28).map(
    (num) => num.toFixed(2)
  ); //[2, 12, 20, 39, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222, 250.36, 310, 400, 420, 450, 500, 540, 690, 780, 952, 1000, 1045.36]
  const dataPoints2 = cumulativeAverageArrayGenerator(22.9770731707317, 3).map(
    (num) => num.toFixed(2) //
  );

  //23 + 4 = 27 = total data points on chart starting from 0
  const badFunction = () => {
    for (let i = 0; i < 24; i++) {
      dataPoints2.push(NaN);
    }
    dataPoints2.push((643.36).toString());
    return dataPoints2;
  };

  const dataPoints3 = badFunction();
  const pointRadius: number[] = [];
  const pointBackgroundColor: string[] = [];

  const findLastNumberBeforeNaN = (data: any) => {
    let lastIndex = -1;

    for (let [index, num] of data.entries()) {
      if (isNaN(num)) {
        return lastIndex;
      }
      lastIndex = index;
    }
  };

  dataPoints3.map((dp, indx) => {
    if (indx === 0 || indx === findLastNumberBeforeNaN(dataPoints3)) {
      pointRadius.push(2);
      pointBackgroundColor.push("#A12BFF");
    } else if (indx === dataPoints3.length - 1) {
      pointRadius.push(2);
      pointBackgroundColor.push("grey");
    } else {
      pointRadius.push(0);
      pointBackgroundColor.push("transparent");
    }
  });

  const skipped = (ctx: any, value: any) => {
    return ctx.p0.skip || ctx.p1.skip ? value : undefined;
  };
  //const up = (ctx, value) => ctx.p0.parsed.y < ctx.p1.parsed.y ? value : undefined;
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cumulative Average Spending",
        data: dataPoints3,
        borderColor: (ctx: any) => {
          return ctx.chart.data.datasets[0].data.length - 1 === ctx.dataIndex
            ? "grey"
            : "#A12BFF";
        }, //can replace ctx.chart.data.datasets[0].data.lenght with just datapoints 3
        segment: {
          borderColor: (ctx: any) => skipped(ctx, "grey"), //|| up(ctx, '#A12BFF'),
          borderDash: (ctx: any) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
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
