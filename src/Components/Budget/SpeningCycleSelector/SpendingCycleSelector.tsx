import React from "react";
import { StyledSpendingCycleSelector } from "./SpendingCycleSelector.styled";
import { SpendingCycleSelectorProps } from "../../../interfaces";

export default function SpendingCycleSelector({
  onClick,
  error,
}: SpendingCycleSelectorProps) {
  return (

      <StyledSpendingCycleSelector error={error} onClick={onClick}>
        <div className="currencyOption">
          <i className="angle down icon"></i>
        </div>
        Monthly
      </StyledSpendingCycleSelector>
    
  
  );
}
