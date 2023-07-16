import React from "react";
import { StyledCategoryButton } from "./CategoryButton.styled";
import { CategoryButtonProps } from "../../../interfaces";
import { NavLink } from "react-router-dom";

export default function CategoryButton({ children, to }: CategoryButtonProps) {
  return (
    <StyledCategoryButton>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? "navlink-active" : "navlink-inactive"
        }
      >
        {children}
      </NavLink>
    </StyledCategoryButton>
  );
}
