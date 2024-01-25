// useCycleEffect.js
import { useEffect } from "react";
import { CycleType } from "../../../types";
import { Signal } from "@preact/signals-react";
import { generateYearsArray } from "../helpers/generateYearsArray";

export const useCycleIndexEffect = (
  selectedCycle: Signal<CycleType>,
  selectedTimeCycleIndex: Signal<number>,
  currentWeekIndex: number,
  selectedYear:number
) => {
  useEffect(() => {
    if (selectedCycle.value === CycleType.Monthly)
      selectedTimeCycleIndex.value = new Date().getMonth();

    if (selectedCycle.value === CycleType.Weekly)
      selectedTimeCycleIndex.value = currentWeekIndex;

    if(selectedCycle.value===CycleType.Annually)
    selectedTimeCycleIndex.value = generateYearsArray().indexOf(selectedYear)
  
  }, [selectedCycle.value, selectedYear]);
};
