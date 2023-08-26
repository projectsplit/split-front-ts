import React, { useState } from "react";
import { StyledCalendar } from "./Calendar.styled";
import { CalendarProps } from "../../../interfaces";
import { BudgetType } from "../../../types";

export default function Calendar({
  children,
  setCalendarDay,
  budgettype,
}: CalendarProps) {
  const [selectedElementIndex, setSelectedElementIndex] = useState<string>("");

  const handleElementClick = (day: string) => {
    setSelectedElementIndex(day);
    setCalendarDay(day);
  };

  return (
    <StyledCalendar as="div" budgettype={budgettype}>
      {budgettype == BudgetType.Monthly
        ? children.map((row: any, rowIndex: any) => (
            <div key={rowIndex} className="calendar-row">
              {row.map((day: string, dayIndex: number) => (
                <div
                  key={day + dayIndex}
                  className={`calendar-day ${
                    selectedElementIndex === day && day != "" ? "selected" : ""
                  }`}
                  style={{ cursor: day !== "" ? "pointer" : "default" }}
                  onClick={() => handleElementClick(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          ))
        : children.map((day: string, dayIndex: number) => (
            <div
              key={day + dayIndex}
              className={`calendar-day ${
                selectedElementIndex === day && day != "" ? "selected" : ""
              }`}
              style={{ cursor: day !== "" ? "pointer" : "default" }}
              onClick={() => handleElementClick(day)}
            >
              {day}
            </div>
          ))}
    </StyledCalendar>
  );
}
