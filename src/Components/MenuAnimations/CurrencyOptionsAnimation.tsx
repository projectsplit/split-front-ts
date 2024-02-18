import React from "react";
import { CSSTransition } from "react-transition-group";
import CurrencyOptions from "../Budget/CurrencyOptions/CurrencyOptions";
import { CurrencyOptionsAnimationProps } from "../../interfaces";

export default function CurrencyOptionsAnimation({
  menu,
  clickHandler
}: CurrencyOptionsAnimationProps) {
  return (
    <CSSTransition
      in={menu.value === "currencyOptions"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <CurrencyOptions
        clickHandler={clickHandler}
      />
    </CSSTransition>
  );
}
