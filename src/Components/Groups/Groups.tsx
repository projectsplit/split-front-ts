import React from "react";
import { StyledGroups } from "./Groups.styled";
import NewButton from "./NewButton/NewButton";
import CategoryButton from "../CategoryButton/CategoryButton";
import { Outlet } from "react-router-dom";
import GroupActionsBar from "./GroupActionsBar/GroupActionsBar";

export default function Groups() {
  return (
    <StyledGroups>
      <GroupActionsBar />
      <div className="groupsLogoStripe">
        <div className="groupStripe">
          <i className="group icon" />
          <div className="groupsName">Groups</div>
        </div>
        <NewButton />
      </div>
      <div className="groupCategories">
        <CategoryButton>Active</CategoryButton>
        <CategoryButton>Archived</CategoryButton>
        <CategoryButton>Deleted</CategoryButton>
      </div>
      <Outlet />
    </StyledGroups>
  );
}
