import React from "react";
import { CSSTransition } from "react-transition-group";
import CurrencyOptions from "../../CurrencyOptions/CurrencyOptions";
import { CurrencyOptionsAnimationProps } from "../../../../interfaces";

export default function CurrencyOptionsAnimation({
  menu,
  currency,
  budgettype,
}: CurrencyOptionsAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "currencyOptions"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <CurrencyOptions
        menu={menu}
        currency={currency}
        budgettype={budgettype}
      />
    </CSSTransition>
  );
}
