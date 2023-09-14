import React, { useState } from "react";
import { api } from "../../apis/api";
import { StyledBudget } from "./Budget.styled";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import InputMonetary from "../InputMonetary/InputMonetary";
import SpendingCycleSelector from "./SpeningCycleSelector/SpendingCycleSelector";
import Calendar from "./Calendar/Calendar";
import { currencyMask } from "../../helpers/currencyMask";
import { removeCommas } from "../../helpers/removeCommas";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  BudgetInfoResponse,
  BudgetType,
  CreateBudgetRequest,
} from "../../types";
import CalendarOptionsButton from "./CalendarOptionButton/CalendarOptionsButton";
import SubmitButton from "../SubmitButton/SubmitButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import Recommendation from "../Recommendation/Recommendation";
import OnTrackMessage from "../OnTrackMessage/OnTrackMessage";
import { useTheme } from "styled-components";
import { getOrdinalSuffix } from "../../helpers/getOrdinalSuffix";
import { getWeekday } from "../../helpers/getWeekDay";

export default function Budget() {
  const [amount, setAmount] = useState<string>("");
  const [displayedAmount, setDisplayedAmount] = useState<string>("");
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const navigate = useNavigate();
  const [calendarDay, setCalendarDay] = useState<string>("");
  const [budgettype, setBudgetType] = useState<BudgetType>(BudgetType.Monthly);
  const theme = useTheme();

  const handleInputChange = (e: any) => {
    setDisplayedAmount(currencyMask(e).target.value);
    setAmount(removeCommas(e.target.value));
  };

  const monthDaysArray = Array.from({ length: 5 }, (_, weekIndex) =>
    weekIndex < 4
      ? Array.from({ length: 7 }, (_, dayIndex) => weekIndex * 7 + dayIndex + 1)
      : [29, 30, 31, "", "", "", ""]
  );

  const daysArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const getDayNumber = (day: string): string | null => {
    const index = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].indexOf(day);
    if (index != -1) return (index + 1).toString();
    return null;
  };

  const createBudget = useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ["budget", "create"],
    mutationFn: api.createBudget,
    onError: (error) => {
      console.log(error.response.data);
    },
  });

  const { error, data, refetch, isSuccess, isFetching, isLoading } =
    useQuery<BudgetInfoResponse>({
      queryKey: ["budget"],
      queryFn: () => api.getBudgetInfo(budgettype),
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  const submitBudget = async () => {
    if (budgettype === BudgetType.Monthly) {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype,
        currency: "USD",
        day: calendarDay.toString(),
      });
    } else {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype,
        currency: "USD",
        day: getDayNumber(calendarDay),
      });
    }
  };

  const calendarTypeHandler = (budgetType: BudgetType) => {
    if (calendarDay !== "" && budgetType === budgettype) {
      setBudgetType(budgetType);
    } else {
      setBudgetType(budgetType);
      setCalendarDay("");
    }
  };

  const budgetInfoMessage = (data: BudgetInfoResponse): JSX.Element => {
    const totalAmountSpent = parseFloat(data.totalAmountSpent);
    const remainingDays = parseFloat(data.remainingDays);
    const averageSpentPerDay = parseFloat(data.averageSpentPerDay);
    const goal = parseFloat(data.goal);
    const spendingProjection =
      totalAmountSpent + remainingDays * averageSpentPerDay;

    const isOnTarget = spendingProjection - goal > 0 ? false : true;
    if (!isOnTarget) {
      const offBudgetBy = (spendingProjection - goal).toFixed(2);
      const reachCapInDays = (
        (goal - totalAmountSpent) /
        averageSpentPerDay
      ).toFixed(0);
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
  };

  return (
    <StyledBudget>
      <div className="topBar">
        <div className="backButtonContainer">
          <BiArrowBack className="backButton" onClick={() => navigate("/")} />
        </div>
        <div className="descr">Budget Settings</div>
      </div>

      <div className="promptSpendingCap">
        <div className="prompt">Set up your spending cap or goal</div>

        <InputMonetary
          value={displayedAmount}
          onChange={(e) => handleInputChange(e)}
          currency="USD"
        />
      </div>

      <div className="promptSpendingCycle">
        <div className="prompt">Select your spending cycle</div>
        <SpendingCycleSelector onClick={() => setOpenCalendar((prev) => !prev)}>
          {calendarDay === "" ? (
            budgettype === BudgetType.Monthly ? (
              "Monthly"
            ) : (
              "Weekly"
            )
          ) : budgettype === BudgetType.Monthly ? (
            <div className="monthlyPropmt">
              Monthly on the {calendarDay}{" "}
              <sup className="sup">{getOrdinalSuffix(calendarDay)}</sup>
            </div>
          ) : (
            <>Weekly on {getWeekday(getDayNumber(calendarDay))}</>
          )}
        </SpendingCycleSelector>
        {openCalendar && (
          <div className="categoryButtons">
            <CalendarOptionsButton
              onClick={() => calendarTypeHandler(BudgetType.Monthly)}
              isActive={budgettype === BudgetType.Monthly}
            >
              Monthly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => calendarTypeHandler(BudgetType.Weekly)}
              isActive={budgettype === BudgetType.Weekly}
            >
              Weekly
            </CalendarOptionsButton>
          </div>
        )}
        {openCalendar && (
          <Calendar setCalendarDay={setCalendarDay} budgettype={budgettype}>
            {budgettype === BudgetType.Monthly ? monthDaysArray : daysArray}
          </Calendar>
        )}
      </div>

      <div className="spentInfo">You have spent $156.36 this month</div>
      <ProgressBar data={data} isFetching={isFetching} />

      {data !== undefined && budgetInfoMessage(data)}

      <div className="submitButton">
        <SubmitButton onClick={submitBudget}>Submit Budget</SubmitButton>
      </div>
    </StyledBudget>
  );
}
