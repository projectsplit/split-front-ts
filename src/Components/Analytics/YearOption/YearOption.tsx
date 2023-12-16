import React from "react";
import { StyledYearOption } from "./YearOption.styled";
import { YearOptionProps } from "../../../interfaces";
import CategoryButton from "../../CategoryButton/CategoryButton";
import { useTheme } from "styled-components";

export default function YearOption({ selectedYear, menu }: YearOptionProps) {
  const theme = useTheme();

  function generateYearsArray(): number[] {
    const currentYear: number = new Date().getFullYear();
    const startYear: number = 1930;

    return Array.from(
      { length: currentYear - startYear + 1 },
      (_, index) => startYear + index
    );
  }

  const allYears: number[] = generateYearsArray().reverse();

  return (
    <StyledYearOption>
      {allYears.map((year: number, index: number) => (
        <CategoryButton
          selected={year === selectedYear.value}
          onClick={() => {
            selectedYear.value = year;
            menu.value = null;
          }}
          backgroundcoloronselect={theme?.colors.clicked}
          key ={index}
        >
          <div className="wrapper">
            <div key={index} className="height"></div>
            <span>{year}</span>
            <div className="height"></div>
          </div>
        </CategoryButton>
      ))}
    </StyledYearOption>
  );
}
