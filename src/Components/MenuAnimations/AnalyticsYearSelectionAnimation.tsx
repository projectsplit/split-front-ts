import React from "react";
import { CSSTransition } from "react-transition-group";
import { AnalyticsYearSelectionAnimationProps } from "../../interfaces";
import Selection from "../Analytics/Charts/Selection/Selection";

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
      <Selection header={header}>{children}</Selection>
    </CSSTransition>
  );
}
