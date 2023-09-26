import React from "react";
import { StyledProgressBar } from "./ProgressBar.styled";
import { TbTargetArrow } from "react-icons/tb";
import { ProgressBarProps } from "../../../interfaces";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { getOrdinalSuffix } from "../../../helpers/getOrdinalSuffix";
import { getWeekday } from "../../../helpers/getWeekDay";
import { BudgetInfoResponse } from "../../../types";
import { useTheme } from "styled-components";
import { getIsoDateInfo } from "../../../helpers/getIsoDateInfo";
import { time } from "console";

export default function ProgressBar({ data }: ProgressBarProps) {
  const theme = useTheme();

  let percentage: number = 0;
  if (data?.totalAmountSpent !== undefined && data?.goal !== undefined) {
    const totalAmountSpent = parseFloat(data.totalAmountSpent);
    const goal = parseFloat(data.goal);
    if (!isNaN(totalAmountSpent) && !isNaN(goal)) {
      percentage = parseFloat(((totalAmountSpent / goal) * 100).toFixed(1));
    }
  }

  const progressBarColor = (data: BudgetInfoResponse | undefined) => {
    if (
      data !== undefined &&
      data.remainingDays !== undefined &&
      data.goal !== undefined &&
      data.averageSpentPerDay !== undefined
    ) {
      const totalAmountSpent = parseFloat(data.totalAmountSpent);
      const remainingDays = parseFloat(data.remainingDays);
      const averageSpentPerDay = parseFloat(data.averageSpentPerDay);
      const goal = parseFloat(data.goal);
      const spendingProjection =
        totalAmountSpent + remainingDays * averageSpentPerDay;
      if (totalAmountSpent < goal && spendingProjection < goal) {
        return theme?.colors.green;
      } else return theme?.colors.redish;
    } else {
      return "black";
    }
  };

  const startDateDecomposed = getIsoDateInfo(data?.startDate);
  const endDateDecomposed = getIsoDateInfo(data?.endDate);
  
  return (
    <StyledProgressBar percentage={percentage} color={progressBarColor(data)}>
      <div className="budgetInfo">
        <div className="thisPeriod">
          <div className="budgetTitle">
            {startDateDecomposed.dateNumber} {startDateDecomposed.month} -{" "}
            {endDateDecomposed.dateNumber} {endDateDecomposed.month}
          </div>
          <div className="progressBar">
            <TbTargetArrow className="targetIcon" />
            <div className="wrapper">
              <div className="barWrapper">
                <div className="bar" />
              </div>
              <div className="monetaryProgress">
                {data?.currency !== undefined ? (
                  <strong>
                    {displayCurrencyAndAmount(
                      data.totalAmountSpent,
                      data.currency
                    )}{" "}
                    / {displayCurrencyAndAmount(data.goal, data.currency)}
                  </strong>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="amount">{percentage}%</div>
          </div>
          <div className="miscInfo">
            <div className="remainingDays">
              Remaining days: <strong>{data?.remainingDays}</strong>
            </div>
            <div className="averageSpending">
              Avg spent per day:&nbsp;
              <strong>
                {data?.currency !== undefined
                  ? displayCurrencyAndAmount(
                      data.averageSpentPerDay,
                      data.currency
                    )
                  : ""}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </StyledProgressBar>
  );
}
