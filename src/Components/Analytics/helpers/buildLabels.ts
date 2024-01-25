import { months } from "../../../constants/dates";
import { CycleType } from "../../../types";
import { enhanceStringArray } from "./enhanceStringArray";
import { convertToFullMonthNames } from "./monthlyDataHelpers";

export const buildLabels = (
  cycle: CycleType,
  selectedTimeCycleIndex: number,
  datesToNumbers: number[],
  monthsAndDaysArrays: string[][],
  fractalFactor: number
) => {

  switch (cycle) {
    case CycleType.Monthly:
      return datesToNumbers.map((num) => num.toString().padStart(2, "0"));
    case CycleType.Weekly:
      const toFullMonthNames =
        convertToFullMonthNames(monthsAndDaysArrays)[selectedTimeCycleIndex];
      return enhanceStringArray(toFullMonthNames, fractalFactor);
    case CycleType.Annually:
      return enhanceStringArray(months.map((month) => month), fractalFactor);
    default:
      return [""];
  }
};