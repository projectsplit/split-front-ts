import React from "react";
import { StyledSetUpSpendingGoal } from "./SetUpSpendingGoal.styled";
import InputMonetary from "../../../InputMonetary/InputMonetary";
import { SetUpSpendingGoalProps } from "../../../../interfaces";

export default function SetUpSpendingGoal({
  setMenu,
  displayedAmount,
  currency,
  submitBudgetErrors,
  onChange,
}: SetUpSpendingGoalProps) {
  return (
    <StyledSetUpSpendingGoal>
      <div className="prompt">Set up your spending cap or goal</div>
      <div className="inputAndErrorsWrapper">
        <InputMonetary
          setMenu={setMenu}
          value={displayedAmount}
          onChange={onChange}
          currency={currency}
          inputError={submitBudgetErrors.find(
            (item) => item.field === "Amount" || item.field === "Currency"
          )}
        />
        {submitBudgetErrors.find(
          (item) => item.field === "Amount" || item.field === "Currency"
        ) && (
          <span className="errorMsg">
            {
              submitBudgetErrors.find(
                (item) => item.field === "Amount" || item.field === "Currency"
              ).errorMessage
            }
          </span>
        )}
      </div>
    </StyledSetUpSpendingGoal>
  );
}
