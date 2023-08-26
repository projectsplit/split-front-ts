import React from "react";
import { StyledProgressBar } from "./ProgressBar.styled";
import { TbTargetArrow } from "react-icons/tb";

export default function ProgressBar() {
  return (
    <StyledProgressBar>
      <div className="budgetTitle">This month</div>
      <div className="progressBar">
        <TbTargetArrow className="targetIcon" />
        <div className="wrapper">
          <div className="bar"></div>
        </div>

        <div className="amount">$1.5K</div>
      </div>
      <div className="monetaryProgress"></div>
      <div className="remainingDays">Remaining Days: 10</div>
      <div className="averageSpending">Avg Spening Per Day: $22.97</div>
    </StyledProgressBar>
  );
}
