import React, { useEffect, useRef, useState } from "react";
import { api } from "../../apis/api";
import { StyledBudget } from "./Budget.styled";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import InputMonetary from "../InputMonetary/InputMonetary";
import SpendingCycleSelector from "./SpeningCycleSelector/SpendingCycleSelector";
import Calendar from "./Calendar/Calendar";
import { currencyMask } from "../../helpers/currencyMask";
import { removeCommas } from "../../helpers/removeCommas";
import { useMutation } from "@tanstack/react-query";
import { BudgetType, CreateBudgetRequest } from "../../types";
import CalendarOptionsButton from "./CalendarOptionButton/CalendarOptionsButton";
import SubmitButton from "../SubmitButton/SubmitButton";
import ProgressBar from "./ProgressBar/ProgressBar";
//const converter = require("currency-exchanger-js");

export default function Budget() {
  const [amount, setAmount] = useState<string>("");
  const [displayedAmount, setDisplayedAmount] = useState<string>("");
  const [openCalendar, setOpenCalendar] = useState<boolean>(false);
  const navigate = useNavigate();
  // const [currencySymbolMargin, setCurrencySymbolMargin] = useState<number>(0);
  const [calendarDay, setCalendarDay] = useState<string>("");
  const [budgettype, setBudgetType] = useState<BudgetType>(BudgetType.Monthly);

  // const [width, setWidth] = useState<number>(0);
  // const [content, setContent] = useState<string>("");
  // const dummySpan = useRef<HTMLSpanElement>(null);
  // const dummyInput = useRef<HTMLInputElement>(null);

  // const xchange = async () => {
  //   const sgdToMyr = await converter.convertOnDate(
  //     1,
  //     "gbp",
  //     "eur",
  //     new Date("2023-08-17")
  //   );

  //   console.log(sgdToMyr)
  // };
  //https://www.youtube.com/watch?v=ydQEZ6qn9Y4

  const handleInputChange = (e: any) => {
    setDisplayedAmount(currencyMask(e).target.value);
    setAmount(removeCommas(e.target.value));

    // const characterWidth = 10;
    // const margin = characterWidth * amount.length;

    //setCurrencySymbolMargin(margin);
  };

  // useEffect(() => {
  //   if (dummySpan.current && dummyInput.current) {
  //     setWidth(dummySpan.current.offsetWidth);
  //   }
  //   // xchange();
  // }, [amount]);

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
    setBudgetType(budgetType);
    setCalendarDay("");
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
        {/* <span className="dummySpan" ref={dummySpan}>
          {content}
        </span> */}

        <InputMonetary
          value={displayedAmount}
          onChange={(e) => handleInputChange(e)}
          currency="USD"
          // currencysymbolmargin={currencySymbolMargin}
          // width={width}
          // inputWidth={dummyInput.current?.offsetWidth}
          // ref={dummyInput}
        />
      </div>

      <div className="promptSpendingCycle">
        <div className="prompt">Select your spending cycle</div>
        <SpendingCycleSelector onClick={() => setOpenCalendar((prev) => !prev)}>
          {calendarDay === ""
            ? budgettype === BudgetType.Monthly
              ? "Monthly"
              : "Weekly"
            : budgettype === BudgetType.Monthly
            ? "Monthly on the " + calendarDay + "th"
            : "Weekly on " + calendarDay}
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
      <ProgressBar budgettype={budgettype}/>
      <div className="submitButton">
        <SubmitButton onClick={submitBudget}>Submit Budget</SubmitButton>
      </div>
    </StyledBudget>
  );
}
