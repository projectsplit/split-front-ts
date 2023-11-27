import React from "react";
import { CSSTransition } from "react-transition-group";
import CurrencyOptions from "../../CurrencyOptions/CurrencyOptions";
import { CurrencyOptionsAnimationProps } from "../../../../interfaces";

export default function CurrencyOptionsAnimation({
  menu,
  setMenu,
  setCurrency,
  budgettype,
}: CurrencyOptionsAnimationProps) {
  return (
    <CSSTransition
      in={menu === "currencyOptions"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <CurrencyOptions
        setMenu={setMenu}
        setCurrency={setCurrency}
        budgettype={budgettype}
      />
    </CSSTransition>
  );
}
