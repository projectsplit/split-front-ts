import React, { useEffect, useState } from "react";
import { api } from "../../../apis/api";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import InputMonetary from "../../InputMonetary/InputMonetary";
import SpendingCycleSelector from "../SpendingCycleSelector/SpendingCycleSelector";
import Calendar from "../Calendar/Calendar";
import { currencyMask } from "../../../helpers/currencyMask";
import { removeCommas } from "../../../helpers/removeCommas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BudgetInfoResponse,
  BudgetType,
  CreateBudgetRequest,
  SpendingInfoResponse,
} from "../../../types";
import CalendarOptionsButton from "../CalendarOptionButton/CalendarOptionsButton";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { getOrdinalSuffix } from "../../../helpers/getOrdinalSuffix";
import { getWeekday } from "../../../helpers/getWeekDay";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import ConfirmationForBudgetSubmission from "../ConfirmationForBudgetSubmission/ConfirmationForBudgetSubmission";
import CurrencyOptions from "../CurrencyOptions/CurrencyOptions";
import { CSSTransition } from "react-transition-group";
import IonIcon from "@reacticons/ionicons";
import SpendingCycleInfo from "../SpendingCycleInfo/SpendingCycleInfo";
import "../../styles/freakflags/freakflags.css";
import { StyledCreateBudget } from "./CreateBudget.styled";
import useSpendingInfo from "../../../hooks/useSpendingInfo";
import TopBarWithBackButton from "../../../layouts/TopBarWithBackButton/TopBarWithBackButton";

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

  const nodeRef = React.useRef(null);

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
    } else {
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

  const calendarTypeHandler = (budgetType: BudgetType) => {
    if (calendarDay !== "" && budgetType === budgettype) {
      setBudgetType(budgetType);
    } else {
      setBudgetType(budgetType);
      setCalendarDay("");
    }

    if (!hasSwitchedBudgetType || isStale) {
      queryClient.invalidateQueries(budgetInfoQueryKey);
    }

    if (!hasSwitchedBudgetType) {
      setHasSwitchedBudgetType(true);
    }
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

      <TopBarWithBackButton header="Budget" onClick={() => handleBackButtonClick()}/>

      <div className="promptSpendingCap">
        <div className="prompt">Set up your spending cap or goal</div>

        <div className="inputAndErrorsWrapper">
          <InputMonetary
            setMenu={setMenu}
            value={displayedAmount}
            onChange={(e) => handleInputChange(e)}
            currency={currency}
            inputError={submitBudgetErrors.find(
              (item) => item.field === "Amount" || item.field === "Currency"
            )}
          />
          {submitBudgetErrors.find(
            (item) => item.field === "Amount" || item.field === "Currency"
          ) && (
            <span className="errorMsg">
              {
                submitBudgetErrors.find(
                  (item) => item.field === "Amount" || item.field === "Currency"
                ).errorMessage
              }
            </span>
          )}
        </div>
      </div>

      <div className="promptSpendingCycle">
        <div className="spendingCycleHeader">
          <div className="prompt">Select your spending cycle</div>
          <IonIcon
            onClick={() => setMenu("infoBox")}
            name="information-circle-outline"
            className="information"
          />
        </div>
        <div className="calendarAndErrorsWrapper">
          <SpendingCycleSelector
            onClick={() => setOpenCalendar((prev) => !prev)}
            open={openCalendar}
            inputError={submitBudgetErrors.find(
              (item) => item.field === "Day" || item.field === "BudgetType"
            )}
          >
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
          {submitBudgetErrors.find(
            (item) => item.field === "Day" || item.field === "BudgetType"
          ) && (
            <span className="errorMsg">
              {
                submitBudgetErrors.find(
                  (item) => item.field === "Day" || item.field === "BudgetType"
                ).errorMessage
              }
            </span>
          )}
        </div>
        {openCalendar && (
          <div className="categoryButtons">
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(BudgetType.Monthly);
              }}
              isactive={budgettype === BudgetType.Monthly}
            >
              Monthly
            </CalendarOptionsButton>
            <CalendarOptionsButton
              onClick={() => {
                calendarTypeHandler(BudgetType.Weekly);
              }}
              isactive={budgettype === BudgetType.Weekly}
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

      <CSSTransition
        nodeRef={nodeRef}
        onClick={() => setMenu(null)}
        in={Boolean(menu)}
        timeout={0}
        unmountOnExit
      >
        <div
          style={{
            position: "fixed",
            left: "0px",
            top: "0px",
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            opacity: "0.7",
          }}
        />
      </CSSTransition>

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

      <CSSTransition
        in={menu === "infoBox"}
        timeout={100}
        classNames="infoBox"
        unmountOnExit
      >
        <SpendingCycleInfo setMenu={setMenu} />
      </CSSTransition>

      <CSSTransition
        in={menu === "currencyOptions"}
        timeout={100}
        classNames="bottomslide"
        unmountOnExit
      >
        <CurrencyOptions
          setMenu={setMenu}
          setCurrency={setCurrency}
          budgettype={budgettype}
        />
      </CSSTransition>
    </StyledCreateBudget>
  );
}
