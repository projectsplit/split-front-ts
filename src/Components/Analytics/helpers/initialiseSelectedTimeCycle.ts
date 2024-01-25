import { CycleType } from "../../../types";
import { generateYearsArray } from "./generateYearsArray";

export const initialiseSelectedTimeCycle = (
  cycle: CycleType,
  currentWeekIndex: number,
  selectedYear:number
) => {

  switch (cycle) {
    case CycleType.Monthly:
      return new Date().getMonth(); //start by displaying current month if user selects month
    case CycleType.Weekly:
      return currentWeekIndex; //start by displaying current week if user selects week
    case CycleType.Annually:
      return generateYearsArray().indexOf(selectedYear); //start by displaying current year if user slects annual
    default:
      return 0;
  }
};
