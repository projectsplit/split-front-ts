import React from "react";
import { StyledInput, StyledSearchBar } from "./SearchBar.styled";
import { SearchBarProps } from "../../../../interfaces";

export default function SearchBar({
  onBlur,
  onFocus,
  onChange,
  value,
}: SearchBarProps) {
  return (
    <StyledSearchBar>
      <StyledInput
        type="text"
        inputMode="decimal"
        placeholder={"Search"}
        spellCheck="false"
        autoComplete="off"
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        value={value}
      />
    </StyledSearchBar>
  );
}
