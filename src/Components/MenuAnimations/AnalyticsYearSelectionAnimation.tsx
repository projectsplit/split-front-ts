import React from "react";
import { CSSTransition } from "react-transition-group";
import { AnalyticsYearSelectionAnimationProps } from "../../interfaces";
import CycleSelection from "../Analytics/Charts/CycleSelection/CycleSelection";

export default function AnalyticsYearSelectionAnimation({
  menu,
  header,
  children,
}: AnalyticsYearSelectionAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "year"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <CycleSelection header={header}>{children}</CycleSelection>
    </CSSTransition>
  );
}
