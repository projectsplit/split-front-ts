// useCycleEffect.js
import { useEffect } from "react";
import { CycleType } from "../../../types";
import { Signal } from "@preact/signals-react";

export const useCycleEffectEffect = (
  selectedCycle: Signal<CycleType>,
  selectedTimeCycleIndex: Signal<number>,
  currentDateIndex: number
) => {
  useEffect(() => {
    if (selectedCycle.value === CycleType.Monthly)
      selectedTimeCycleIndex.value = new Date().getMonth();

    if (selectedCycle.value === CycleType.Weekly)
      selectedTimeCycleIndex.value = currentDateIndex;
  }, [selectedCycle.value]);
};
