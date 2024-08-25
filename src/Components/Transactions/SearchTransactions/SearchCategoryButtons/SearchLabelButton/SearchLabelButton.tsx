import React from "react";
import { StyledSearchCategoryButton } from "../SearchCategoryButton.styled";
import { SearchLabelButtonProps } from "../../../../../interfaces";

export default function SearchLabelButton({
  category,
  type,
  onClick
}: SearchLabelButtonProps) {


  
  return (
    <StyledSearchCategoryButton onClick={onClick} >
      <div className="category">{category}:</div>&nbsp;
      <div className="type">{type}</div>
    </StyledSearchCategoryButton>
  );
}
