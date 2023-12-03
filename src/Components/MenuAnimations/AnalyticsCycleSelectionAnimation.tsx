import React from "react";
import { CSSTransition } from "react-transition-group";
import { AnalyticsCycleSelectionAnimationProps } from "../../interfaces";
import CycleSelection from "../Analytics/Charts/CycleSelection/CycleSelection";

export default function AnalyticsCycleSelectionAnimation({
  menu,
  header,
  children,
}: AnalyticsCycleSelectionAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "cycle"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <CycleSelection header={header}>{children}</CycleSelection>
    </CSSTransition>
  );
}
