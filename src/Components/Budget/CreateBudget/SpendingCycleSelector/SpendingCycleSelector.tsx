import React, { useState } from "react";
import { StyledSpendingCycle } from "./SpendingCycleSelector.styled";
import IonIcon from "@reacticons/ionicons";
import SpendingCycleSelector from "../../SpendingCycleSelector/SpendingCycleSelector";
import { getWeekday } from "../../../../helpers/getWeekDay";
import { getOrdinalSuffix } from "../../../../helpers/getOrdinalSuffix";
import CalendarOptionsButton from "../../CalendarOptionButton/CalendarOptionsButton";
import Calendar from "../../Calendar/Calendar";
import { BudgetType } from "../../../../types";
import { SpendingCycleProps } from "../../../../interfaces";
import { useQueryClient } from "@tanstack/react-query";

export default function SpendingCycle({
  submitBudgetErrors,
  calendarDay,
  budgettype,
  setBudgetType,
  setCalendarDay,
  setMenu,
  isStale,
  openCalendar,
  setOpenCalendar,
  hasSwitchedBudgetType,
  setHasSwitchedBudgetType,
}: SpendingCycleProps) {

  const queryClient = useQueryClient();

  const getDayNumber = (day: string): string | null => {
    const index = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].indexOf(day);
    if (index !== -1) return (index + 1).toString();
    return null;
  };

  const daysArray = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const monthDaysArray = Array.from({ length: 5 }, (_, weekIndex) =>
    weekIndex < 4
      ? Array.from({ length: 7 }, (_, dayIndex) => weekIndex * 7 + dayIndex + 1)
      : [29, 30, 31, "", "", "", ""]
  );
  const budgetInfoQueryKey = ["budget"];
  
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

  return (
    <StyledSpendingCycle>
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
    </StyledSpendingCycle>
  );
}
