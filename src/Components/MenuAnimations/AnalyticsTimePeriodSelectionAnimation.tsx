import React from 'react'
import { AnalyticsTimePeriodSelectionAnimationProps } from '../../interfaces'
import { CSSTransition } from "react-transition-group";
import Selection from "../Analytics/Charts/Selection/Selection";

export default function AnalyticsTimePeriodSelectionAnimation({
    menu,
    header,
    children,
  }: AnalyticsTimePeriodSelectionAnimationProps) {
  return (
    <CSSTransition
    in={menu.value === "timePeriod"}
    timeout={100}
    classNames="bottomslide"
    unmountOnExit
  >
   <Selection header={header}>{children}</Selection>
  </CSSTransition>
  )
}
