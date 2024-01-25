import React from "react";
import { StyledCycleOption } from "./CycleOption.styled";
import { CycleOptionProps } from "../../../interfaces";
import { CycleType } from "../../../types";

export default function CycleOption({
  selectedCycle,
  menu,
  cyclehaschanged,
}: CycleOptionProps) {
  return (
    <StyledCycleOption>  
      <div
        onClick={() => {
          selectedCycle.value === CycleType.Weekly || selectedCycle.value === CycleType.Monthly
            ? (cyclehaschanged.value = true)
            : (cyclehaschanged.value = false);
          selectedCycle.value = CycleType.Annually;
          menu.value = null;
        }}
        className={`item ${
          selectedCycle.value === CycleType.Annually ? "clicked" : ""
        }`}
      >
        Annually
      </div>

      <div
        onClick={() => {
          selectedCycle.value === CycleType.Weekly || selectedCycle.value === CycleType.Annually
            ? (cyclehaschanged.value = true)
            : (cyclehaschanged.value = false);
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
          selectedCycle.value === CycleType.Monthly || selectedCycle.value === CycleType.Annually
            ? (cyclehaschanged.value = true)
            : (cyclehaschanged.value = false);
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
