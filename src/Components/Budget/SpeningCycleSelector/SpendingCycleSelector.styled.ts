import styled from "styled-components";
import { SpendingCycleSelectorProps } from "../../../interfaces";

export const StyledSpendingCycleSelector = styled.button<SpendingCycleSelectorProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;

  border-radius: 4px;
  padding: 0.8rem;
  outline: none;
  color: white;
  background-color: #2d2d2d;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-style: none;
  font-size: 18px;
  cursor: pointer;
  text-align: left;
  border: ${({ error, theme }) =>
    error ? `1px solid ${theme.colors.pink}` : "none"};

  .currencyOption {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    right: 14px;
  }
  .icon {
    font-size: 25px;
  }
`;
