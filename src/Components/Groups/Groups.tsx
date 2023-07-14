import React from "react";
import { StyledGroup } from "./Groups.styled";
import LogoStripe from "../Home/LogoStripe/LogoStripe";
import NewButton from "./NewButton/NewButton";

export default function Groups() {
  return (
    <StyledGroup>
      <LogoStripe />
      <div className="groupsLogoStripe">
        <div className="groupsInfo">
          <i className="group icon" />
          <div className="groupsName">Groups</div>
        </div>
        <NewButton />
      </div>
      
    </StyledGroup>
  );
}
