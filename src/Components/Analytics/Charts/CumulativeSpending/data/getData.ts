import { Signal } from "@preact/signals-react";
import { CycleType } from "../../../../../types";
import { ChartDataset } from 'chart.js/auto';
import { generateYearsArray } from "../../../helpers/generateYearsArray";

export const getData = (
  labels: string[],
  selectedCycle: Signal<CycleType>,
  selectedTimeCycleIndex: Signal<number>,
  projectedArray: number[],
  cumulArrayData: number[],
  currentDateIndex:number,
  pointRadiusProjection: number[],
  pointRadius: number[],
  pointBackgroundColorProjection: string[],
  pointBackgroundColor: string[],
  isSuccess:boolean,
  selectedYear:number
) => {
  const gradient = document
    .createElement("canvas")
    .getContext("2d") as CanvasRenderingContext2D;

  const linearGradient = gradient.createLinearGradient(0, 0, 0, 300);
  linearGradient.addColorStop(0, "rgba(153, 30, 251, 0.25)");
  linearGradient.addColorStop(1, "rgba(217, 217, 217, 0)");

  const skipped = (ctx: any, value: any) => {
   
   return ctx.p0.skip || ctx.p1.skip ? value : undefined;

  };

  const showForecastLegend = (cycle:CycleType)=>{
    switch (cycle) {
      case CycleType.Monthly:
        return selectedTimeCycleIndex.value === new Date().getMonth() && isSuccess && cumulArrayData?.length !== 0
          ? true
          : false;
      case CycleType.Weekly :
        return selectedTimeCycleIndex.value === currentDateIndex && isSuccess && cumulArrayData?.length !== 0
          ? true
          : false;
      case CycleType.Annually:
        const currentYear =new Date().getFullYear()
        return selectedTimeCycleIndex.value === generateYearsArray().indexOf(currentYear) && isSuccess && cumulArrayData?.length !== 0
      default:
        return false; 
    }
  }
  
  return {
    labels: labels,
    datasets: [
      {
        label: "Total Spent",
        data: (() => {
          return projectedArray
          // switch (selectedCycle.value) {
          //   case CycleType.Monthly:
          //     return selectedTimeCycleIndex.value === new Date().getMonth()
          //       ? projectedArray
          //       : cumulArrayData;
          //   case CycleType.Weekly:
          //     return selectedTimeCycleIndex.value === currentDateIndex
          //       ? projectedArray
          //       : cumulArrayData;//TODO : Need to be removed and leave projected only
          //   // Add additional cases for other cycle types if needed
          //   default:
          //     return cumulArrayData; // Default case
          // }
        })(),
        borderColor: (ctx: any) => {
          if (
            selectedTimeCycleIndex.value === new Date().getMonth() ||
            selectedTimeCycleIndex.value === currentDateIndex ||
            selectedTimeCycleIndex.value === generateYearsArray().indexOf(selectedYear)

          ) {
            return ctx.chart.data.datasets[0].data.length - 1 === ctx.dataIndex
              ? "grey"
              : "#A12BFF";
          }
          return "#A12BFF";
        },
        segment: {
          borderColor: (ctx: any) => skipped(ctx, "grey"),
          borderDash: (ctx: any) => skipped(ctx, [6, 6]),
        },
        spanGaps: true,
        backgroundColor: linearGradient,
        fill: 'start',
        tension: 0.2,
        borderWidth: 2,
        pointRadius: pointRadiusProjection,
        pointBackgroundColor: pointBackgroundColorProjection,
      },
      showForecastLegend(selectedCycle.value)
      ? {
          label: "Forecast",
          data: [],
          borderColor: "grey",
          borderWidth: 2
        }
        : null, // Set to null if the condition is not met
      ].filter(Boolean) as ChartDataset<'line', number[]>[],
  };
};
