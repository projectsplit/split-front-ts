import React from "react";
import { StyledConfirmationForBudgetSubmission } from "./ConfirmationForBudgetSubmission.styled";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { ConfirmationForBudgetSubmissionProps } from "../../../interfaces";

export default function ConfirmationForBudgetSubmission({
  submitBudget,
  // setMenu,
  menu,
}: ConfirmationForBudgetSubmissionProps) {
  return (
    <StyledConfirmationForBudgetSubmission>
      <div className="header">
        {" "}
        <strong>Submit Budget</strong>
      </div>
      <div className="prompt">
        Submitting a new budget will replace your current one.Would you like to
        continue?
      </div>

      <SubmitButton onClick={submitBudget}>Continue</SubmitButton>
      <SubmitButton onClick={() => (menu.value = null)}>Cancel</SubmitButton>
    </StyledConfirmationForBudgetSubmission>
  );
}
