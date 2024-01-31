import React from "react";
import { StyledCycleOption } from "./CycleOption.styled";
import { CycleOptionProps } from "../../../interfaces";
import { Frequency } from "../../../types";

export default function CycleOption({
  selectedCycle,
  menu,
  cyclehaschanged,
}: CycleOptionProps) {
  return (
    <StyledCycleOption>  
      <div
        onClick={() => {
          selectedCycle.value === Frequency.Weekly || selectedCycle.value === Frequency.Monthly
            ? (cyclehaschanged.value = true)
            : (cyclehaschanged.value = false);
          selectedCycle.value = Frequency.Annually;
          menu.value = null;
        }}
        className={`item ${
          selectedCycle.value === Frequency.Annually ? "clicked" : ""
        }`}
      >
        Annually
      </div>

      <div
        onClick={() => {
          selectedCycle.value === Frequency.Weekly || selectedCycle.value === Frequency.Annually
            ? (cyclehaschanged.value = true)
            : (cyclehaschanged.value = false);
          selectedCycle.value = Frequency.Monthly;
          menu.value = null;
        }}
        className={`item ${
          selectedCycle.value === Frequency.Monthly ? "clicked" : ""
        }`}
      >
        Monthly
      </div>
      <div
        onClick={() => {
          selectedCycle.value === Frequency.Monthly || selectedCycle.value === Frequency.Annually
            ? (cyclehaschanged.value = true)
            : (cyclehaschanged.value = false);
          selectedCycle.value = Frequency.Weekly;
          menu.value = null;
        }}
        className={`item ${
          selectedCycle.value === Frequency.Weekly ? "clicked" : ""
        }`}
      >
        Weekly
      </div>

    </StyledCycleOption>
  );
}
