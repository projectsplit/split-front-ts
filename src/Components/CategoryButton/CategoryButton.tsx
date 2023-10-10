import React from "react";
import { StyledCategoryButton } from "./CategoryButton.styled";
import { CategoryButtonProps } from "../../interfaces";
import { NavLink } from "react-router-dom";

export default function CategoryButton({ children }: CategoryButtonProps) {
  const to = `${children.toLowerCase()}`;
  return (
    <StyledCategoryButton>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "active" : "inactive"
        }
      >
        {children}
      </NavLink>
    </StyledCategoryButton>
  );
}
