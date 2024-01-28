import { CycleType } from "../../../types";
import { generateYearsArray } from "./generateYearsArray";

export const isCurrentPeriod = (
    cycle: CycleType,
    selectedTimeCycleIndex: number,
    isSuccess: boolean,
    cumulArrayData: number[],
    currentWeekIndex: number) => {

    switch (cycle) {
        case CycleType.Monthly:
            return selectedTimeCycleIndex === new Date().getMonth() && isSuccess && cumulArrayData?.length !== 0

        case CycleType.Weekly:
            return selectedTimeCycleIndex === currentWeekIndex && isSuccess && cumulArrayData?.length !== 0

        case CycleType.Annually:
            const currentYear = new Date().getFullYear()
            return selectedTimeCycleIndex === generateYearsArray().indexOf(currentYear) && isSuccess && cumulArrayData?.length !== 0

        default:
            return false;
    }
}