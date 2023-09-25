import React from "react";
import { StyledSpendingCycleSelector } from "./SpendingCycleSelector.styled";
import { SpendingCycleSelectorProps } from "../../../interfaces";

export default function SpendingCycleSelector({
  onClick,
  error,
  children,
  open,
}: SpendingCycleSelectorProps) {
  return (
    <StyledSpendingCycleSelector error={error} onClick={onClick} open={open}>
      <div className="currencyOption">
        {open ? (
          <i className="angle up icon"></i>
        ) : (
          <i className="angle down icon"></i>
        )}
      </div>
      {children}
    </StyledSpendingCycleSelector>
  );
}
