import React from "react";
import { StyledProgressBar } from "./ProgressBar.styled";
import { TbTargetArrow } from "react-icons/tb";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../apis/api";
import { ProgressBarProps } from "../../../interfaces";
import { BudgetInfoResponse } from "../../../types";

export default function ProgressBar({ budgettype }: ProgressBarProps) {
  
  const { error, data, refetch, isSuccess, isFetching, isLoading } =
    useQuery<any>({
      queryKey: ["budget"],
      queryFn: () => api.getBudgetInfo(budgettype),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  console.log(data);
  return (
    <StyledProgressBar>
      <div className="budgetTitle">This month</div>
      <div className="progressBar">
        <TbTargetArrow className="targetIcon" />
        <div className="wrapper">
          <div className="barWrapper">
            <div className="bar" />
          </div>
          <div className="monetaryProgress">
            <strong>£902.6 / £1,500</strong> &nbsp; (60.2%)
          </div>
        </div>
        <div className="amount">$1.5K</div>
      </div>
      <div className="miscInfo">
        <div className="remainingDays">
          Remaining Days: <strong>10</strong>
        </div>
        <div className="averageSpending">
          Avg Spending Per Day:<strong> $22.97</strong>
        </div>
      </div>
    </StyledProgressBar>
  );
}
