import React from "react";
import { StyledGroups } from "./Groups.styled";
import CategoryButton from "../CategoryButton/CategoryButton";
import { Outlet } from "react-router-dom";

import GroupsMainStripe from "./GroupsMainStripe/GroupsMainStripe";
import Separator from "../Separator/Separator";

export default function Groups() {
  return (
    <StyledGroups>
      <GroupsMainStripe />
      <div className="groupCategories">
        <CategoryButton to="active">Active</CategoryButton>
        <CategoryButton to="archived">Archived</CategoryButton>
        <CategoryButton to="deleted">Deleted</CategoryButton>
      </div>
      <Separator/>
      <Outlet />
    </StyledGroups>
  );
}
