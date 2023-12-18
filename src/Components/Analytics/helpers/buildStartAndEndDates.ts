import { CycleType } from "../../../types";
import { formatDateIntoYMD } from "./formatDateIntoYMD";
import { getAllDaysInMonth } from "./monthlyDataHelpers";

export  const buildStartAndEndDates = (
    cycle: CycleType,
    selectedTimeCycleIndex: number,
    selectedYear:number,
    allWeeksPerYear: Date[][]
  ) => {
    let startDate:string;
    let endDate:string
    switch (cycle) {
      case CycleType.Monthly:
        const allDaysInMonth = getAllDaysInMonth(
          selectedTimeCycleIndex + 1,
          selectedYear
        );
        startDate = formatDateIntoYMD(allDaysInMonth[0])
        endDate = formatDateIntoYMD(allDaysInMonth[allDaysInMonth.length - 1]);

        return [startDate, endDate]

      case CycleType.Weekly:
        const currentWeek = allWeeksPerYear[selectedTimeCycleIndex]
         startDate = formatDateIntoYMD(currentWeek[0])
         endDate = formatDateIntoYMD(currentWeek[currentWeek.length-1])
        return  [startDate, endDate]
      default:
        return "";
    }
  };