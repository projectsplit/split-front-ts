import React from "react";
import { StyledManageBudgetMenu } from "./ManageBudgetMenu.styled";
import { StyledManageBudgetOption } from "./ManageBudgetMenu.styled";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { ManageBudgetMenuProps } from "../../../interfaces";
import { useNavigate } from "react-router-dom";

export default function ManageBudgetMenu({ setMenu }: ManageBudgetMenuProps) {
  const navigate = useNavigate();
  return (
    <StyledManageBudgetMenu>
      <div className="header">
        {" "}
        <strong>Manage Budget</strong>
      </div>

      <StyledManageBudgetOption onClick={() => navigate("/budget/create")}>
        <div className="edit">
          <AiFillEdit className="icon" />
          <span className="text">Edit Budget</span>
          <div> </div>
        </div>
      </StyledManageBudgetOption>

      <StyledManageBudgetOption
        onClick={() => setMenu("deleteBudgetConfirmation")}
      >
        <div className="edit">
          <AiFillDelete className="icon" />
          <span className="text">Remove Budget</span>
          <div> </div>
        </div>
      </StyledManageBudgetOption>
    </StyledManageBudgetMenu>
  );
}
