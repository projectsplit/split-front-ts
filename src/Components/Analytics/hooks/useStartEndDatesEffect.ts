import { useEffect } from "react";
import { buildStartAndEndDates } from "../helpers/buildStartAndEndDates";
import { CycleType } from "../../../types";
import { Signal } from "@preact/signals-react";
import { generateYearsArray } from "../helpers/generateYearsArray";

export const useStartAndEndDatesEffect = (
  selectedCycle: Signal<CycleType>,
  selectedTimeCycleIndex: Signal<number>,
  selectedYear: Signal<number>,
  allWeeksPerYear: Date[][],
  startDate: Signal<string>,
  endDate: Signal<string>
) => {

  useEffect(() => {
    const startAndEndDates = buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear
    );

    startDate.value = startAndEndDates[0];
    endDate.value = startAndEndDates[1];
  }, [selectedTimeCycleIndex.value, selectedYear.value]);
};
