import OnTrackMessage from "../components/OnTrackMessage/OnTrackMessage";
import OverspentMessage from "../components/OverspentMessage/OverspentMessage";
import ReceivedMoreThanSpentMessage from "../components/ReceivedMoreThanSpentMessage/ReceivedMoreThanSpentMessage";
import Recommendation from "../components/Recommendation/Recommendation";
import { BudgetInfoResponse } from "../types";
import { DefaultTheme } from "styled-components";

export const BudgetInfoMessage = (
  data: BudgetInfoResponse,
  theme: DefaultTheme | undefined
): JSX.Element => {
  const totalAmountSpent = parseFloat(data.totalAmountSpent);
  console.log(data)
  // Check if remainingDays, goal, and averageSpentPerDay are provided
  if (
    data.remainingDays !== undefined &&
    data.goal !== undefined &&
    data.averageSpentPerDay !== undefined &&
    data.budgetType !== undefined
  ) {
    const remainingDays = parseFloat(data.remainingDays);
    const averageSpentPerDay = parseFloat(data.averageSpentPerDay);
    const goal = parseFloat(data.goal);
    const spendingProjection =
      totalAmountSpent + remainingDays * averageSpentPerDay;
    if (totalAmountSpent === 0) return <></>;
    if (totalAmountSpent < 0)
      return (
        <ReceivedMoreThanSpentMessage
          amount={totalAmountSpent.toString()}
          currency={data.currency}
          closeButton={false}
          budgetType={data.budgetType}
          style={{
            backgroundColor: theme?.colors.inputGrey,
            borderColor: theme?.colors.inputGrey,
            borderStyle: "solid",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "6px",
            padding: "0.8rem",
          }}
        />
      );
    if (totalAmountSpent >= goal) {
      const overspentBy = (totalAmountSpent - goal).toFixed(2);
      const offBudgetAmount = (spendingProjection - goal).toFixed(2);
      return (
        <OverspentMessage
          overspent={totalAmountSpent > goal}
          offBudgetAmount={offBudgetAmount}
          overspentBy={overspentBy}
          currency={data.currency}
          closeButton={false}
          budgetType={data.budgetType}
          style={{
            backgroundColor: theme?.colors.inputGrey,
            borderColor: theme?.colors.inputGrey,
            borderStyle: "solid",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "6px",
            padding: "0.8rem",
          }}
        />
      );
    } else {
      const isOnTarget = spendingProjection - goal > 0 ? false : true;

      if (!isOnTarget) {
        const offBudgetBy = (spendingProjection - goal).toFixed(2);
        const reachCapInDays = (
          (goal - totalAmountSpent) /
          averageSpentPerDay
        ).toFixed(1);
        const reduceByRecommendation = (
          averageSpentPerDay -
          (goal - totalAmountSpent) / remainingDays
        ).toFixed(2);

        return (
          <Recommendation
            days={reachCapInDays}
            offBudgetAmount={offBudgetBy}
            reduceAmount={reduceByRecommendation}
            currency={data.currency}
            closeButton={false}
            budgetType={data.budgetType}
            style={{
              backgroundColor: theme?.colors.inputGrey,
              borderColor: theme?.colors.inputGrey,
              borderStyle: "solid",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "6px",
              padding: "0.8rem",
            }}
          />
        );
      } else {
        const onTargetAmount = (goal - spendingProjection).toFixed(2);
        return (
          <OnTrackMessage
            amount={onTargetAmount}
            currency={data.currency}
            closeButton={false}
            budgetType={data.budgetType}
            style={{
              backgroundColor: theme?.colors.inputGrey,
              borderColor: theme?.colors.inputGrey,
              borderStyle: "solid",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "6px",
              padding: "0.8rem",
            }}
          />
        );
      }
    }
  } else {
    return (
      <div>
        <p>
          Some required budget data is missing. Cannot calculate projections.
        </p>
      </div>
    );
  }
};
