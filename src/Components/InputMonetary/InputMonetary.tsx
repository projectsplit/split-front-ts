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
    width,
    inputWidth,
    inputError,
  }: InputMonetaryProps,
  ref: React.Ref<HTMLInputElement>
) {
  return (
    <StyledInputMonetary
      inputError={inputError}
      value={value}
      currency={currency}
      width={width}
      ref={ref}
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
        inputWidth={inputWidth}
      />
      {/* {value !== undefined && value.length > 0 && (
        <div className="currencySymbol">
          <span>{getSymbolFromCurrency(currency)}</span>
        </div>
      )} */}
    </StyledInputMonetary>
  );
});
