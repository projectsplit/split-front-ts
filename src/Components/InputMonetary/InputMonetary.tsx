import React, { useEffect, useRef, useState } from "react";
import { StyledInput, StyledInputMonetary } from "./InputMonetary.styled";
import { InputMonetaryProps } from "../../interfaces";
import getSymbolFromCurrency from "currency-symbol-map";

export default React.forwardRef(function InputMonetary(
  {
    onBlur,
    onFocus,
    onChange,
    value,
    currency,
    onMouseDown,
    currencysymbolmargin,
    width
  }: InputMonetaryProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <StyledInputMonetary
    currencysymbolmargin={currencysymbolmargin}
      value={value}
      currency={currency}
      width={width}
    >
      <div className="currencyOption">
        <i className="angle down icon"></i>
        <div>{currency}</div>
      </div>

      <StyledInput
        type="text"
        inputMode="decimal"
        placeholder={getSymbolFromCurrency(currency) + "0"}
        spellCheck="false"
        autoComplete="off"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        value={value}
        onMouseDown={onMouseDown}
        width={width}
      />
      {value !== undefined && value.length > 0 && (
        <div className="currencySymbol">{getSymbolFromCurrency(currency)}</div>
      )}
    </StyledInputMonetary>
  );
});
