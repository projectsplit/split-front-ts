import React from "react";
import { StyledCycleOption } from "./CycleOption.styled";
import { CycleOptionProps } from "../../../interfaces";
import { CycleType } from "../../../types";

export default function CycleOption({ selectedCycle, menu }: CycleOptionProps) {
  return (
    <StyledCycleOption>
      <div
        onClick={() => {
          selectedCycle.value = CycleType.Monthly;
          menu.value = null;
        }}
        className={`item ${
          selectedCycle.value === CycleType.Monthly ? "clicked" : ""
        }`}
      >
        Monthly
      </div>
      <div
        onClick={() => {
          selectedCycle.value = CycleType.Weekly;
          menu.value = null;
        }}
        className={`item ${
          selectedCycle.value === CycleType.Weekly ? "clicked" : ""
        }`}
      >
        Weekly
      </div>
    </StyledCycleOption>
  );
}
