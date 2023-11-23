import React from "react";
import { StyledCategoryButton } from "./CategoryButton.styled";
import { CategoryButtonProps } from "../../interfaces";
import { NavLink } from "react-router-dom";

export default function CategoryButton({
  children,
  to,
  selected,
  onClick,
}: CategoryButtonProps) {
  // const to = `${children.toLowerCase()}`;
  return (
    <StyledCategoryButton>
      {to ? (
        <NavLink
          to={to}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          {children}
        </NavLink>
      ) : (
        <div className={selected ? "selected" : "unselected"} onClick={onClick}>
          {children}
        </div>
      )}
    </StyledCategoryButton>
  );
}
