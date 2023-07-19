import React from "react";
import { StyledGroups } from "./Groups.styled";
import LogoStripe from "../Home/LogoStripe/LogoStripe";
import NewButton from "./NewButton/NewButton";
import TreeAdjustedContainer from "../Home/TreeAdjustedContainer/TreeAdjustedContainer";
import CategoryButton from "./CategoryButton/CategoryButton";
import { Outlet } from "react-router-dom";

export default function Groups() {

  return (
    <StyledGroups>
      <LogoStripe />
      <div className="groupsLogoStripe">
        <div className="groupStripe">
          <i className="group icon" />
          <div className="groupsName">Groups</div>
        </div>
        <NewButton />
      </div>
      <div className="groupCategories">
        <CategoryButton to="active">Active</CategoryButton>
        <CategoryButton to="archived">Archived</CategoryButton>
        <CategoryButton to="deleted">Deleted</CategoryButton>
      </div>
        <Outlet />
    </StyledGroups>
  );
}
