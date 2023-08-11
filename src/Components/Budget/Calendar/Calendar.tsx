import React, { useState } from "react";
import { StyledCalendar } from "./Calendar.styled";
import { CalendarProps } from "../../../interfaces";

export default function Calendar({ children }: CalendarProps) {
  const [selectedDayIndex, setSelectedDayIndex] = useState<any>(null);

  const handleDayClick = (day: any, index: any) => {
    setSelectedDayIndex(day);

  };

  return (
    <StyledCalendar>
      {children.map((row: any, rowIndex: any) => (
        <div key={rowIndex} className="calendar-row">
          {row.map((day: any, dayIndex: any) => (
            <div
              key={day + dayIndex}
              className={`calendar-day ${
                selectedDayIndex === day && day != "" ? "selected" : ""
              }`}
              style={{ cursor: day !== "" ? "pointer" : "default" }}
              onClick={() => handleDayClick(day, dayIndex)}
            >
              {day}
            </div>
          ))}
        </div>
      ))}
    </StyledCalendar>
  );
}
