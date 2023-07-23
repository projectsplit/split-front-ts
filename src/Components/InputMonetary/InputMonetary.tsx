import React, { useState } from "react";
import { StyledInput, StyledInputMonetary } from "./InputMonetary.styled";
import { InputMonetaryProps } from "../../interfaces";

export default function InputMonetary({
  onBlur,
  onFocus,
  onChange,
  value,
}: InputMonetaryProps) {

  return (
    <StyledInputMonetary>
      <div className="currencyOption">
        <i className="angle down icon"></i>
        <div>EUR </div>
      </div>
      <StyledInput
        type="text"
        inputMode="decimal"
        placeholder="0"
        spellCheck="false"
        autoComplete="off"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        value={value}
      />
    </StyledInputMonetary>
  );
}
