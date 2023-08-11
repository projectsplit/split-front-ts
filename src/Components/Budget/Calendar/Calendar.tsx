import React, { useState } from "react";
import { StyledCalendar } from "./Calendar.styled";
import { CalendarProps } from "../../../interfaces";

export default function Calendar({ children }: CalendarProps) {
  const [selectedElementIndex, setSelectedElementIndex] = useState<string>('');

  const handleElementClick = (day: string) => {
    setSelectedElementIndex(day);

  };

  return (
    <StyledCalendar>
      {children.map((row: any, rowIndex: any) => (
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
      ))}
    </StyledCalendar>
  );
}
