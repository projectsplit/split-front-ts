import React from "react";
import { StyledConfirmationForBudgetDeletion } from "./ConfirmationForBudgetDeletion.styled";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { ConfirmationForBudgetDeletionProps } from "../../../interfaces";

export default function ConfirmationForBudgetDeletion({
  removeBudget,
  setMenu,
}: ConfirmationForBudgetDeletionProps) {
  return (
    <StyledConfirmationForBudgetDeletion>
      <div className="header">
        {" "}
        <strong>Delete Budget</strong>
      </div>
      <div className="prompt">
        Are you sure you want to delete your current budget?
      </div>

      <SubmitButton onClick={removeBudget}>Confirm</SubmitButton>
      <SubmitButton onClick={() => setMenu(null)}>Cancel</SubmitButton>
    </StyledConfirmationForBudgetDeletion>
  );
}
