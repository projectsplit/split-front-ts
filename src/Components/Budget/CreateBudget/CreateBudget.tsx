import React, { useEffect, useState } from "react";
import { api } from "../../../apis/api";
import { useNavigate } from "react-router-dom";
import { currencyMask } from "../../../helpers/currencyMask";
import { removeCommas } from "../../../helpers/removeCommas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BudgetType,
  CreateBudgetRequest,
  SpendingInfoResponse,
} from "../../../types";

import SubmitButton from "../../SubmitButton/SubmitButton";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import "../../styles/freakflags/freakflags.css";
import { StyledCreateBudget } from "./CreateBudget.styled";
import useSpendingInfo from "../../../hooks/useSpendingInfo";
import TopBarWithBackButton from "../../../layouts/TopBarWithBackButton/TopBarWithBackButton";
import SetUpSpendingGoal from "./SetUpSpendingGoal/SetUpSpendingGoal";
import SpendingCycle from "./SpendingCycleSelector/SpendingCycleSelector";
import MenuAnimationBackground from "./MenuAnimations/MenuAnimationBackground";
import CreateBudgetConfirmationAnimation from "./MenuAnimations/CreateBudgetConfirmationAnimation";
import InfoBoxAnimation from "./MenuAnimations/InfoBoxAnimation";
import CurrencyOptionsAnimation from "./MenuAnimations/CurrencyOptionsAnimation";

export default function CreateBudget() {
  const [amount, setAmount] = useState<string>("");
  const [displayedAmount, setDisplayedAmount] = useState<string>("");
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const [calendarDay, setCalendarDay] = useState<string>("");
  const [budgettype, setBudgetType] = useState<BudgetType>(BudgetType.Monthly);
  const [hasSwitchedBudgetType, setHasSwitchedBudgetType] = useState(false);
  const [submitBudgetErrors, setSubmitBudgetErrors] = useState<any[]>([]);
  const [menu, setMenu] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>(
    localStorage.getItem("budgetCurrency") || "USD"
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const budgetInfoQueryKey = ["budget"];
  const spendingInfoQueryKey = ["spending", budgettype, currency];

  const createBudget = useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ["budget", "create"],
    mutationFn: api.createBudget,
    onError: (error) => {
      setSubmitBudgetErrors(error.response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(budgetInfoQueryKey);
      navigate("/budget/current");
    },
  });

  const { data, isFetching, isStale } = useSpendingInfo(budgettype, currency);

  useEffect(() => {
    if (localStorage.getItem("budgetCurrency") === null)
      localStorage.setItem("budgetCurrency", "USD");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayedAmount(currencyMask(e).target.value);
    setAmount(removeCommas(e.target.value));
  };

  const getDayNumber = (day: string): string | null => {
    const index = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].indexOf(day);
    if (index !== -1) return (index + 1).toString();
    return null;
  };

  const submitBudget = async () => {
    if (budgettype === BudgetType.Monthly) {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype,
        currency: currency,
        day: calendarDay.toString(),
      });
    }
    if (budgettype === BudgetType.Weekly) {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype,
        currency: currency,
        day: getDayNumber(calendarDay),
      });
    }
    setSubmitBudgetErrors([]);
    setOpenCalendar(false);
    queryClient.invalidateQueries(budgetInfoQueryKey);
    setHasSwitchedBudgetType(false);
    setDisplayedAmount("");
    setMenu(null);
    setAmount("");
    // navigate(`/budget/current`);
  };

  const querydata = queryClient.getQueryData(
    spendingInfoQueryKey
  ) as SpendingInfoResponse;

  const handleBackButtonClick = () => {
    if (data && data.budgetSubmitted) {
      navigate(`/budget/current`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <StyledCreateBudget>
      <TopBarWithBackButton
        header="Budget"
        onClick={() => handleBackButtonClick()}
      />

      <SetUpSpendingGoal
        setMenu={setMenu}
        displayedAmount={displayedAmount}
        currency={currency}
        submitBudgetErrors={submitBudgetErrors}
        onChange={(e) => handleInputChange(e)}
      />

      <SpendingCycle
        submitBudgetErrors={submitBudgetErrors}
        calendarDay={calendarDay}
        setBudgetType={setBudgetType}
        budgettype={budgettype}
        setCalendarDay={setCalendarDay}
        setMenu={setMenu}
        isStale={isStale}
        openCalendar={openCalendar}
        setOpenCalendar={setOpenCalendar}
        hasSwitchedBudgetType={hasSwitchedBudgetType}
        setHasSwitchedBudgetType={setHasSwitchedBudgetType}
      />

      {isFetching ? (
        <></>
      ) : (
        querydata && (
          <div className="spentInfo">
            <div>
              You have spent{" "}
              {displayCurrencyAndAmount(
                data?.totalAmountSpent,
                querydata?.currency
              )}{" "}
              this {budgettype === 1 ? "month" : "week"}
            </div>
          </div>
        )
      )}

      <div className="submitButton">
        <SubmitButton
          onClick={() => {
            if (querydata.budgetSubmitted) {
              setMenu("createBudgetConfirmation");
            } else {
              submitBudget();
            }
          }}
        >
          Submit Budget
        </SubmitButton>
      </div>

      <MenuAnimationBackground menu={menu} setMenu={setMenu} />

      <CreateBudgetConfirmationAnimation
        menu={menu}
        setMenu={setMenu}
        submitBudget={submitBudget}
      />

      <InfoBoxAnimation menu={menu} setMenu={setMenu} />

      <CurrencyOptionsAnimation
        menu={menu}
        setMenu={setMenu}
        budgettype={budgettype}
        setCurrency={setCurrency}
      />
    </StyledCreateBudget>
  );
}
