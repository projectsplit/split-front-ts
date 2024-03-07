import React from "react";
import { StyledGroupsMainStripe } from "./GroupsMainStripe.styled";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import NewButton from "../NewButton/NewButton";

export default function GroupsMainStripe() {
  const navigate = useNavigate();
  return (
    <StyledGroupsMainStripe>
      <div className="backButtonContainer">
        <BiArrowBack className="backButton" onClick={() => navigate("/")} />
      </div>
      <div className="groupStripe">
        <div className="title">Groups</div>
      </div>
      <NewButton />
    </StyledGroupsMainStripe>
  );
}
