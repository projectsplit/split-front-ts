import styled from "styled-components";
import { BudgetType } from "../../../types";
import { Signal } from "@preact/signals-react";

interface StyledCalendarProps {
  budgettype: Signal<BudgetType>;
}

export const StyledCalendar = styled.div<StyledCalendarProps>`
  display: flex;
  flex-direction: ${(props) =>
    props.budgettype.value === BudgetType.Monthly ? "column" : "row"};
  padding: 1rem 0.8rem;
  border-radius: 6px;
  gap: 10px;
  background-color: ${({ theme }) => theme.colors.layer2};
  border-color: ${({ theme }) => theme.colors.layer2};
  border-style: solid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  overflow-wrap: break-word;
  .calendar-row {
    display: flex;
  }

  .calendar-day {
    flex: 1;
    
    border-radius: 6px;
    padding: 0.1rem;
    text-align: center;
    position: relative;
    
    &.selected {
      color: black;
      font-weight: bold;
    
    }
    &.selected:before {
      
      content: ""; /* Empty content for the pseudo-element */
      position: absolute;
      top: 50%; /* Position at the vertical center */
      left: 50%; /* Position at the horizontal center */
      transform: translate(-50%, -50%); /* Center the circle */
      width: 30px;
      height: 30px; 
      background-color: ${({ theme }) =>
        theme.colors.whiteText};
      border-radius: 50%; /* Make it a circle */
      z-index: -1; /* Place the circle behind the number */
      
    }

    &.selected {
      z-index: 1; /* Place the number on top of the circle */
    }
  }
`;
