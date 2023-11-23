import React from "react";
import { roundThousandsAndMillions } from "../../../../helpers/roundThousandsAndMils";
import { Context } from "chartjs-plugin-datalabels";
import { ChartOptions } from "chart.js/auto";

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

export function TotalLentBorrowed() {
  const buildMidPoints = (dataArray: number[]) => {
    const enhancedData = [];

    for (let i = 0; i < dataArray.length - 1; i++) {
      const midpoint = (dataArray[i] + dataArray[i + 1]) / 2;
      enhancedData.push(dataArray[i], midpoint);
    }

    enhancedData.push(dataArray[dataArray.length - 1]);

    return enhancedData;
  };

  const period = "April";
  const year = "2021";
  const currency = "$";

  const getAllDaysInMonth = (month: number, year: number) =>
    Array.from(
      { length: new Date(year, month, 0).getDate() },
      (_, i) => new Date(year, month - 1, i + 1)
    );

  const dates = getAllDaysInMonth(2, 2021);
  const enhancedDatesToNubmers = buildMidPoints(
    dates.map((date) => date.getDate())
  );

  const labels: string[] = enhancedDatesToNubmers.map((num) =>
    num.toString().padStart(2, "0")
  );

  const randomNum = Math.floor(Math.random() * 2) + 0.5;
  //const totalLent = [1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222, 250.36, 310, 400, 420, 450, 500, 540, 690, 940, 952, 1000, 1045.36]
  const totalBorrowed = [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1045.36,
  ];
  const totalLent = [
    2, 5, 10, 75, 80, 80, 100, 100, 100, 110, 110, 120, 130, 145, 200, 250,
    250.36, 300, 312, 400, 500, 500, 520, 610, 620, 1200, 1300, 1445.36,
  ];
  //const totalBorrowed = totalLent.map(dp => dp * randomNum)
  const totalLentExt = buildMidPoints(totalLent);
  const totalBorrowedExt = buildMidPoints(totalBorrowed);

  const pointRadius: number[] = [];
  const hitRadius: number[] = [];
  const pointBackgroundColorTotalLent: string[] = [];
  const pointBackgroundColorTotalLentTotalBorrowed: string[] = [];

  const createConditionForMiddlePoint = (dataArrLen: number, indx: number) => {
    if (
      indx === Math.floor(dataArrLen / 2) &&
      enhancedDatesToNubmers[indx] % 1 === 0
    ) {
      return Math.floor(dataArrLen / 2);
    } else {
      return Math.floor(dataArrLen / 2 + 1);
    }
  };

  totalLentExt.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === totalLentExt.length - 1 ||
      indx === createConditionForMiddlePoint(totalLentExt.length, indx)
    ) {
      pointRadius.push(2);
      pointBackgroundColorTotalLent.push("#317E24");
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLent.push("transparent");
    }
    if (indx % 2 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });

  totalBorrowedExt.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === totalLentExt.length - 1 ||
      indx === createConditionForMiddlePoint(totalBorrowedExt.length, indx)
    ) {
      pointRadius.push(2);
      pointBackgroundColorTotalLentTotalBorrowed.push("#FF3D3D");
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLentTotalBorrowed.push("transparent");
    }
    if (indx % 2 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });

  const paintBackgroundUnderLines = (ctx: any) => {
    if (
      totalBorrowedExt[ctx.p0DataIndex] > totalLentExt[ctx.p0DataIndex] ||
      totalBorrowedExt[ctx.p1DataIndex] > totalLentExt[ctx.p1DataIndex]
    ) {
      return "rgba(255, 74, 94, 0.23)"; //red
    } else return "rgba(34, 135, 29,0.2)"; //green
  };

  const options: any = {
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
            if (context.dataset.label === "Total Lent") {
              return `Total Lent:` + ` ` + `${currency}` + `${value}`;
            } else {
              return `Total Borrowed:` + ` ` + `${currency}` + `${value}`;
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
        },
        padding: 5,
        formatter: (value: number, context: Context) => {
          // Show price label for first, middle, and last data points
          if (
            context.dataIndex === 0 ||
            context.dataIndex === context.dataset.data.length - 1
          ) {
            return "$" + roundThousandsAndMillions(value.toString());
          } else if (
            context.dataIndex === Math.floor(context.dataset.data.length / 2)
          ) {
            if (enhancedDatesToNubmers[context.dataIndex] % 1 === 0) {
              return "$" + roundThousandsAndMillions(value.toString());
            } else {
              return (
                "$" +
                roundThousandsAndMillions(
                  context.dataset.data[context.dataIndex + 1]?.toString()
                )
              );
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
          callback: (index: number) => {
            // show the label for the first and last date of the month
            if (index === 0) return labels[index];

            // show the label for intervals of 5
            if (parseFloat(labels[index]) % 5 === 0) {
              return Math.floor(parseFloat(labels[index]))
                .toString()
                .padStart(2, "0");
            }
            //show label for last date of chart
            if (index === enhancedDatesToNubmers.length - 1) {
              return labels[enhancedDatesToNubmers.length - 1];
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
        hitRadius: hitRadius,
        hoverRadius: 10,
        pointStyle: "circle",
        pointLabelFontSize: 14,
        pointLabelFontWeight: "bold",
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Lent",
        data: totalLentExt,
        borderColor: "#317E24",
        //backgroundColor: '#071C00',
        fill: "+1",
        tension: 0.2,
        borderWidth: 2,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColorTotalLent,
        stepped: false,
        segment: {
          backgroundColor: (ctx: any) => paintBackgroundUnderLines(ctx),
        },
      },
      {
        label: "Total Borrowed",
        data: totalBorrowedExt,
        borderColor: "#FF3D3D",
        //backgroundColor: "rgba(49, 126, 36, 0.2)",
        fill: "-1",
        tension: 0.2,
        borderWidth: 2,
        pointRadius: pointRadius,
        pointBackgroundColor: pointBackgroundColorTotalLentTotalBorrowed,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "330px" }}>
      <Line options={options} data={data} plugins={[ChartDataLabels]} />
    </div>
  );
}
