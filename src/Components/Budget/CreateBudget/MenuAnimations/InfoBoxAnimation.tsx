import React from "react";
import { CSSTransition } from "react-transition-group";
import SpendingCycleInfo from "../../SpendingCycleInfo/SpendingCycleInfo";
import { InfoBoxAnimationProps } from "../../../../interfaces";

export default function InfoBoxAnimation({ menu }: InfoBoxAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "infoBox"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
    >
      <SpendingCycleInfo menu={menu} />
    </CSSTransition>
  );
}
