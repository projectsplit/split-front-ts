import { CycleType } from "../../../types";
import { enhanceWeekDays } from "./enhanceWeekDays";
import { convertToFullMonthNames } from "./monthlyDataHelpers";

export const buildLabels = (
  cycle: CycleType,
  selectedTimeCycleIndex: number,
  datesToNumbers: number[],
  monthsAndDaysArrays: string[][],
  fractalFactor:number
) => {
  switch (cycle) {
    case CycleType.Monthly:
      return datesToNumbers.map((num) => num.toString().padStart(2, "0"));
    case CycleType.Weekly:
      const toFullMonthNames =
        convertToFullMonthNames(monthsAndDaysArrays)[selectedTimeCycleIndex];
      return enhanceWeekDays(toFullMonthNames, fractalFactor);
    default:
      return [""];
  }
};