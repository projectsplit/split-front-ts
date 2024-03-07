import React from "react";
import { StyledGroupActionsBar } from "./GroupActionsBar.styled";
import QRscanner from "../../../../components/QRscanner/QRscanner";
import { BiArrowBack } from "react-icons/bi";
import { IoMdPersonAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";



export default function GroupActionsBar() {
  const navigate = useNavigate();
  return (
    <StyledGroupActionsBar>
      <div className="mainContainer">
        <div className="backButtonContainer">
          <BiArrowBack
            className="backButton"
            onClick={() => navigate("/groups/active")}
          />
        </div>
        <div className="QRandAddUserOptions">
          <QRscanner />
          <IoMdPersonAdd className="addUserButton" />
        </div>
      </div>
    </StyledGroupActionsBar>
  );
}
