import React from "react";
import { StyledSetUpSpendingGoal } from "./SetUpSpendingGoal.styled";
import InputMonetary from "../../../InputMonetary/InputMonetary";
import { SetUpSpendingGoalProps } from "../../../../interfaces";

export default function SetUpSpendingGoal({
  menu,
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
          menu={menu}
          value={displayedAmount.value}
          onChange={onChange}
          currency={currency}
          inputError={submitBudgetErrors.value.find(
            (item) => item.field === "Amount" || item.field === "Currency"
          )}
        />
        {submitBudgetErrors.value.find(
          (item) => item.field === "Amount" || item.field === "Currency"
        ) && (
          <span className="errorMsg">
            {
              submitBudgetErrors.value.find(
                (item) => item.field === "Amount" || item.field === "Currency"
              ).errorMessage
            }
          </span>
        )}
      </div>
    </StyledSetUpSpendingGoal>
  );
}
