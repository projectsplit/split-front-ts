import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchDateButtonProps } from "../../../../../interfaces";

export default function SearchLabelButton({
  category,
  type,
  onClick
}: SearchDateButtonProps) {


  return (
    <StyledSearchCategoryButton onClick={onClick} >
      <div className="category">{category}:</div>&nbsp;
      <div className="type">{type}</div>
    </StyledSearchCategoryButton>
  );
}
