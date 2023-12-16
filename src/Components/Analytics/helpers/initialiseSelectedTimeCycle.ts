import { CycleType } from "../../../types";

export const initialiseSelectedTimeCycle = (
  cycle: CycleType,
  currentDateIndex: number
) => {
  switch (cycle) {
    case CycleType.Monthly:
      return new Date().getMonth(); //start by displaying current month if user selects month
    case CycleType.Weekly:
      return currentDateIndex; //start by displaying current week if user selects week
    default:
      return 0;
  }
};
