import React from "react";
import { CSSTransition } from "react-transition-group";
import ConfirmationForBudgetSubmission from "../../ConfirmationForBudgetSubmission/ConfirmationForBudgetSubmission";
import { CreateBudgetConfirmationAnimationProps } from "../../../../interfaces";

export default function CreateBudgetConfirmationAnimation({
  menu,
  setMenu,
  submitBudget,
}: CreateBudgetConfirmationAnimationProps) {
  return (
    <CSSTransition
      in={menu === "createBudgetConfirmation"}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <ConfirmationForBudgetSubmission
        setMenu={setMenu}
        submitBudget={submitBudget}
      />
    </CSSTransition>
  );
}
