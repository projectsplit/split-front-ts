import { Frequency } from "../../../types";
import { generateYearsArray } from "./generateYearsArray";

export const initialiseSelectedTimeCycle = (
  cycle: Frequency,
  currentWeekIndex: number,
  selectedYear:number
) => {

  switch (cycle) {
    case Frequency.Monthly:
      return new Date().getMonth(); //start by displaying current month if user selects month
    case Frequency.Weekly:
      return currentWeekIndex; //start by displaying current week if user selects week
    case Frequency.Annually:
      return generateYearsArray().indexOf(selectedYear); //start by displaying current year if user slects annual
    default:
      return 0;
  }
};
