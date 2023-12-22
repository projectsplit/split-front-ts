import { CycleType } from "../../../types";

export const getCarouselItemsBasedOnCycle = (cycle: CycleType, months:string[], monthsAndDays:string[][]) => {
    switch (cycle) {
      case CycleType.Monthly:
        return months;
      case CycleType.Weekly:
        return monthsAndDays;
      default:
        return [""];
    }
  }