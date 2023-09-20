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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BudgetInfoResponse,
  BudgetType,
  CreateBudgetRequest,
} from "../../types";
import CalendarOptionsButton from "./CalendarOptionButton/CalendarOptionsButton";
import SubmitButton from "../SubmitButton/SubmitButton";
import ProgressBar from "./ProgressBar/ProgressBar";
import { getOrdinalSuffix } from "../../helpers/getOrdinalSuffix";
import { getWeekday } from "../../helpers/getWeekDay";
import { BudgetInfoMessage } from "../../helpers/BudgetInfoMessage";
import Spinner from "../Spinner/Spinner";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";

export default function Budget() {
  const [amount, setAmount] = useState<string>("");
  const [displayedAmount, setDisplayedAmount] = useState<string>("");
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const navigate = useNavigate();
  const [calendarDay, setCalendarDay] = useState<string>("");
  const [budgettype, setBudgetType] = useState<BudgetType>(BudgetType.Monthly);

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

  const queryClient = useQueryClient();
  const queryKey = ["budget", budgettype];

  const createBudget = useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ["budget", "create"],
    mutationFn: api.createBudget,
    onError: (error) => {
      console.log(error.response.data);
    },
    onSuccess: () => {
      console.log("invalidated")
      queryClient.invalidateQueries(queryKey);
     
    },
  });

  const { error, data, refetch, isSuccess, isInitialLoading, isFetching } =
    useQuery<BudgetInfoResponse>({
      queryKey: queryKey,
      queryFn: () => api.getBudgetInfo(budgettype, "USD"),
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      staleTime: 60000,
      enabled: true,
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
    setOpenCalendar(false);
  };

  const calendarTypeHandler = (budgetType: BudgetType) => {
    if (calendarDay !== "" && budgetType === budgettype) {
      setBudgetType(budgetType);
    } else {
      setBudgetType(budgetType);
      setCalendarDay("");
    }
  };

  const querydata = queryClient.getQueryData(queryKey) as BudgetInfoResponse;
  console.log(querydata);

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
              onClick={() => {
                calendarTypeHandler(BudgetType.Monthly);
                if (!queryClient.getQueryData(queryKey)) {
                  // Manually trigger the query refetch only if the data is stale
                  queryClient.invalidateQueries(queryKey);
                }
              }}
              isActive={budgettype === BudgetType.Monthly}
            >
              Monthly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(BudgetType.Weekly);
                if (!queryClient.getQueryData(queryKey)) {
                  // Manually trigger the query refetch only if the data is stale
                
                  queryClient.invalidateQueries(queryKey);
                }
              }}
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

      {isFetching ? (
        <Spinner />
      ) : (
        querydata && (
          <div className="spentInfo">
            {!querydata.budgetSubmitted ? (
              <div>
                You have spent{" "}
                {displayCurrencyAndAmount(
                  data?.totalAmountSpent,
                  querydata?.currency
                )}{" "}
                this {budgettype === 1 ? "month" : "week"}
              </div>
            ) : (
              <>
                <span className="currentBudgetTitle">Current budget</span>{" "}
                <ProgressBar data={querydata} isFetching={isFetching} />
                {BudgetInfoMessage(querydata)}
              </>
            )}
          </div>
        )
      )}

      <div className="submitButton">
        {!isFetching && (
          <SubmitButton onClick={submitBudget}>Submit Budget</SubmitButton>
        )}
      </div>
    </StyledBudget>
  );
}
