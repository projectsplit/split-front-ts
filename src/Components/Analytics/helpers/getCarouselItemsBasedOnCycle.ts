import { CycleType } from "../../../types";
import { generateYearsArray } from "./generateYearsArray";

export const getCarouselItemsBasedOnCycle = (cycle: CycleType, months: string[], monthsAndDays: string[][]) => {
  switch (cycle) {
    case CycleType.Monthly:
      return months;
    case CycleType.Weekly:
      return monthsAndDays;
    case CycleType.Annually:
      return generateYearsArray().map(year => year.toString());
    default:
      return [""];
  }
}