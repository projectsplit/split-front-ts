import React from "react";
import { StyledCycleSelection } from "./CycleSelection.styled";
import { CycleSelectionProps } from "../../../../interfaces";

export default function CycleSelection({
  children,
  header
}: CycleSelectionProps) {
  return (
    <StyledCycleSelection>
      <div className="header">
        <strong>{header}</strong>
      </div>
      {children}
    </StyledCycleSelection>
  );
}
