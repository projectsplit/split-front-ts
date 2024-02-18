import React from "react";
import { StyledYearOption } from "./YearOption.styled";
import { YearOptionProps } from "../../../interfaces";
import CategoryButton from "../../CategoryButton/CategoryButton";
import { useTheme } from "styled-components";
import { generateYearsArray } from "../helpers/generateYearsArray";

export default function YearOption({ selectedYear, menu,selectedTimeCycleIndex }: YearOptionProps) {
  const theme = useTheme();

  const allYears: number[] = generateYearsArray().reverse();

  return (
    <StyledYearOption>
      {allYears.map((year: number, index: number) => (
        <CategoryButton
          selected={year === selectedYear.value}
          onClick={() => {
            selectedYear.value = year;
            // selectedTimeCycleIndex.value = allYears.reverse().indexOf(year)
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
