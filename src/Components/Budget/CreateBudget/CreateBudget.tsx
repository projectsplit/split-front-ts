import React, { useEffect, useState } from "react";
import { api } from "../../../apis/api";
import { useNavigate } from "react-router-dom";
import { currencyMask } from "../../../helpers/currencyMask";
import { removeCommas } from "../../../helpers/removeCommas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Frequency,
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
import SpendingCycle from "./SpendingCycle/SpendingCycle";
import MenuAnimationBackground from "../../MenuAnimations/MenuAnimationBackground";
import CreateBudgetConfirmationAnimation from "../../MenuAnimations/CreateBudgetConfirmationAnimation";
import InfoBoxAnimation from "../../MenuAnimations/InfoBoxAnimation";
import CurrencyOptionsAnimation from "../../MenuAnimations/CurrencyOptionsAnimation";
import { useSignal } from "@preact/signals-react";

export default function CreateBudget() {

  const [amount, setAmount] = useState<string>("");
  const displayedAmount = useSignal<string>("");
  const openCalendar = useSignal<boolean>(false);
  const calendarDay = useSignal<string>("");
  const budgettype = useSignal<Frequency>(Frequency.Monthly);
  const hasSwitchedBudgetType = useSignal<boolean>(false);
  const submitBudgetErrors = useSignal<any[]>([]);
  const menu = useSignal<string | null>(null);
  const currency = useSignal<string>(
    localStorage.getItem("budgetCurrency") || "USD"
  );

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const budgetInfoQueryKey = ["budget"];
  const spendingInfoQueryKey = ["spending", budgettype.value, currency];
  const createBudget = useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ["budget", "create"],
    mutationFn: api.createBudget,
    onError: (error) => {
      submitBudgetErrors.value = error.response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(budgetInfoQueryKey);
      navigate("/budget/current");
    },
  });

  const { data, isFetching, isStale } = useSpendingInfo(
    budgettype.value,
    currency.value
  );
    
  useEffect(() => {
    if (localStorage.getItem("budgetCurrency") === null)
      localStorage.setItem("budgetCurrency", "USD");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    displayedAmount.value = currencyMask(e).target.value;
    setAmount(removeCommas(e.target.value));
  };

  const getDayNumber = (day: string): string | null => {
    const index = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].indexOf(day);
    if (index !== -1) return (index + 1).toString();
    return null;
  };

  const submitBudget = async () => {
    if (budgettype.value === Frequency.Monthly) {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype.value,
        currency: currency.value,
        day: calendarDay.value.toString(),
      });
    }
    if (budgettype.value === Frequency.Weekly) {
      createBudget.mutate({
        amount: amount,
        budgetType: budgettype.value,
        currency: currency.value,
        day: getDayNumber(calendarDay.value),
      });
    }

    submitBudgetErrors.value = [];
    openCalendar.value = false;
    queryClient.invalidateQueries(budgetInfoQueryKey);
    hasSwitchedBudgetType.value = false;
    displayedAmount.value = "";
    menu.value = null;
    setAmount("");
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


  const handldeCurrencyOptionsClick = (curr: string) => {
    //setCurrency(currency);
    currency.value = curr;
    localStorage.setItem("budgetCurrency", curr);
    queryClient.invalidateQueries(["spending", budgettype, curr]);
    queryClient.getQueryData(["spending", budgettype, curr]);
    menu.value = null;
  };

  return (
    <StyledCreateBudget>
      <TopBarWithBackButton
        header="Budget"
        onClick={() => handleBackButtonClick()}
      />

      <SetUpSpendingGoal
        menu={menu}
        displayedAmount={displayedAmount}
        currency={currency.value}
        submitBudgetErrors={submitBudgetErrors}
        onChange={(e) => handleInputChange(e)}
      />

      <SpendingCycle
        submitBudgetErrors={submitBudgetErrors}
        calendarDay={calendarDay}
        budgettype={budgettype}
        menu={menu}
        isStale={isStale}
        openCalendar={openCalendar}
        hasSwitchedBudgetType={hasSwitchedBudgetType}
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
              this {budgettype.value === 1 ? "month" : "week"}
            </div>
          </div>
        )
      )}

      <div className="submitButton">
        <SubmitButton
          onClick={() => {
            if (querydata.budgetSubmitted) {
              menu.value = "createBudgetConfirmation";
            } else {
              submitBudget();
            }
          }}
        >
          Submit Budget
        </SubmitButton>
      </div>

      <MenuAnimationBackground menu={menu} />

      <CreateBudgetConfirmationAnimation
        menu={menu}
        submitBudget={submitBudget}
      />

      <InfoBoxAnimation menu={menu} />

      <CurrencyOptionsAnimation
        menu={menu}
        clickHandler={handldeCurrencyOptionsClick}
     
      />

    </StyledCreateBudget>
  );
}
