import React from "react";
import { InputProps } from "../../interfaces";
import { StyledInput } from "./StyledInput.styled";

export default React.forwardRef(function Input(
  {
    onChange,
    placeholder,
    value,
    className,
    type,
    step,
    spellCheck,
    autoFocus,
    error,
    width
  }: InputProps,
  ref: React.Ref<HTMLInputElement>
) {
  
  return (
    <StyledInput
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={className}
      type={type}
      step={step}
      spellCheck={spellCheck}
      autoFocus={autoFocus}
      error={error}
      width={width}
     
    />
  );
});
