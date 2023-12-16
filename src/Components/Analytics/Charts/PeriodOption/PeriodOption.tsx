import React from "react";
import { StyledPeriodOption } from "./StyledPeriodOption";
import { useTheme } from "styled-components";
import { months } from "../../../../constants/dates";
import CategoryButton from "../../../CategoryButton/CategoryButton";
import { PeriodOptionProps } from "../../../../interfaces";

export default function PeriodOption({menu}: PeriodOptionProps) {
  const theme = useTheme();

  return (
    <StyledPeriodOption>
      {months.map((month: string, index: number) => (
        <CategoryButton
        //   selected={year === selectedYear.value}
          onClick={() => {
            // selectedYear.value = year;
            menu.value = null;
          }}
          backgroundcoloronselect={theme?.colors.clicked}
          key={index}
        >
          <div className="wrapper">
            <div key={index} className="height"></div>
            <span>{month}</span>
            <div className="height"></div>
          </div>
        </CategoryButton>
      ))}
    </StyledPeriodOption>
  );
}
