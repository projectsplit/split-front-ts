import React from "react";
import { StyledPeriodOption } from "./StyledPeriodOption";
import { months } from "../../../../constants/dates";
import { PeriodOptionProps } from "../../../../interfaces";
import { CycleType } from "../../../../types";

export default function PeriodOption({
  selectedCycle,
  menu,
  selectedTimeCycleIndex,
  monthsAndDaysArrays,
}: PeriodOptionProps) {

  const displayWeeks = (item:string[])=>{
  if (item.length === 1) return item[0];
  return item[0] + "- " + item[item.length - 1]
  }


  return (
    <StyledPeriodOption>
      {selectedCycle.value === CycleType.Monthly
        ? months.map((month: string, index: number) => (
            <div
              key={index}
              onClick={() => {
                selectedTimeCycleIndex.value = index;
                menu.value = null;
              }}
              className={`item ${
                selectedTimeCycleIndex.value === index ? "clicked" : ""
              }`}
            >
              {month}
            </div>
          ))
        : monthsAndDaysArrays.map(
            (week: string[], index: number) => (
              <div
              key={index}
              onClick={() => {
                selectedTimeCycleIndex.value = index;
                menu.value = null;
              }}
              className={`item ${
                selectedTimeCycleIndex.value === index ? "clicked" : ""
              }`}
            >
              {displayWeeks(week)}
            </div>
            )
          )}
    </StyledPeriodOption>
  );
}
