import React from "react";
import { StyledSearchCategoryButton } from "./SearchCategoryButton.styled";
import { SearchCategoryButtonProps } from "../../../../interfaces";

export default function SearchCategoryButton({
  category,
  type,
  onClick,
}: SearchCategoryButtonProps) {
  return (
    <StyledSearchCategoryButton onClick={onClick} >
      <div className="category">{category}:</div>&nbsp;
      <div className="type">{type}</div>
    </StyledSearchCategoryButton>
  );
}
