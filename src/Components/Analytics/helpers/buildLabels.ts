import { CycleType } from "../../../types";
import { convertToFullMonthNames } from "./monthlyDataHelpers";

export const buildLabels = (
    cycle: CycleType,
    selectedTimeCycleIndex: number,
    datesToNumbers: number[],
    monthsAndDaysArrays: string[][]
      ) => {
    switch (cycle) {
      case CycleType.Monthly:
        return datesToNumbers.map((num) => num.toString().padStart(2, "0"));
      case CycleType.Weekly:
        return convertToFullMonthNames(monthsAndDaysArrays)[selectedTimeCycleIndex];
      default:
        return [""];
    }
  };