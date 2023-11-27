import React from "react";
import { CSSTransition } from "react-transition-group";
import SpendingCycleInfo from "../../SpendingCycleInfo/SpendingCycleInfo";
import { InfoBoxAnimationProps } from "../../../../interfaces";

export default function InfoBoxAnimation({ menu, setMenu }: InfoBoxAnimationProps) {
  return (
    <CSSTransition
      in={menu === "infoBox"}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
    >
      <SpendingCycleInfo setMenu={setMenu} />
    </CSSTransition>
  );
}
