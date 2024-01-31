import React, { useEffect, useState } from "react";
import { StyledAnalytics } from "./Analytics.styled";
import TopBarWithBackButton from "../../layouts/TopBarWithBackButton/TopBarWithBackButton";
import { useNavigate } from "react-router-dom";
import CategoryButton from "../CategoryButton/CategoryButton";
import { MdOutlineShowChart } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdSsidChart } from "react-icons/md";
import { CumulativeSpending } from "./Charts/CumulativeSpending/CumulativeSpending";
import { TotalLentBorrowed } from "./Charts/TotalLentBorrowed/TotalLentBorrowed";
import { BarChart } from "./Charts/BarChart/BarChart";
import { Signal, useSignal } from "@preact/signals-react";
import MenuAnimationBackground from "../MenuAnimations/MenuAnimationBackground";
import CycleOptions from "./CycleOption/CycleOption";
import Years from "./YearOption/YearOption";
import AnalyticsCycleSelectionAnimation from "../MenuAnimations/AnalyticsCycleSelectionAnimation";
import AnalyticsYearSelectionAnimation from "../MenuAnimations/AnalyticsYearSelectionAnimation";
import { Frequency } from "../../types";
import { useWeeklyDatesMemo } from "./hooks/useWeekyDatesMemo";
import AnalyticsTimePeriodSelectionAnimation from "../MenuAnimations/AnalyticsTimePeriodSelectionAnimation";
import PeriodOption from "./Charts/PeriodOption/PeriodOption";
import { initialiseSelectedTimeCycle } from "./helpers/initialiseSelectedTimeCycle";
import CurrencyOptionsAnimation from "../MenuAnimations/CurrencyOptionsAnimation";
import { buildStartAndEndDates } from "./helpers/buildStartAndEndDates";
import { useQueryClient } from "@tanstack/react-query";



export default function Analytics() {
  const [selectedChart, setSelectedChart] =
    useState<string>("cumulativeSpending");
  const selectedCycle = useSignal<Frequency>(Frequency.Monthly);
  const selectedYear = useSignal<number>(new Date().getFullYear());
  const cyclehaschanged = useSignal<boolean>(false);
  const menu = useSignal<string | null>(null);
  const currency = useSignal<string>(
    localStorage.getItem("budgetCurrency") || "USD"
  );
  const queryClient = useQueryClient();
  const [
    allWeeksPerYear,
    wksToDateString,
    monthsAndDaysArrays,
    currentWeekIndex,
  ] = useWeeklyDatesMemo(selectedYear);

  const selectedTimeCycleIndex =
    useSignal<number>(
      initialiseSelectedTimeCycle(selectedCycle.value, currentWeekIndex, selectedYear.value)
    );

  const startDate = useSignal<string>(
    buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear
    )[0]
  );

  const endDate = useSignal<string>(
    buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear
    )[1]
  );

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    selectedTimeCycleIndex.value = initialiseSelectedTimeCycle(selectedCycle.value, currentWeekIndex, selectedYear.value)

  }, [selectedYear.value, selectedCycle.value])


  const handldeCurrencyOptionsClick = (curr: string) => {
    currency.value = curr;
    localStorage.setItem("budgetCurrency", curr);
    if (selectedChart === "cumulativeSpending" || selectedChart === "barChart") {
      queryClient.invalidateQueries(["cumulativeSpending", startDate, endDate, currency.value]);
      queryClient.getQueryData(["cumulativeSpending", startDate, endDate, currency.value]);
    }
    if(selectedChart==="totalLentBorrowed"){
      queryClient.invalidateQueries(["totalLentBorrowed", startDate, endDate, currency.value]);
      queryClient.getQueryData(["totalLentBorrowed", startDate, endDate, currency.value]);
    }
    menu.value = null;
  }


  return (
    <StyledAnalytics>
      <TopBarWithBackButton
        header="Spending Trends"
        onClick={() => handleBackButtonClick()}
      />
      <div className="buttons">
        <div className="groupCategories">
          <CategoryButton
            selected={selectedChart === "cumulativeSpending"}
            onClick={() => setSelectedChart("cumulativeSpending")}
          >
            <MdOutlineShowChart className="buttonChart" />
          </CategoryButton>

          <CategoryButton
            selected={selectedChart === "barChart"}
            onClick={() => setSelectedChart("barChart")}
          >
            <MdBarChart className="buttonChart" />
          </CategoryButton>

          <CategoryButton
            selected={selectedChart === "totalLentBorrowed"}
            onClick={() => setSelectedChart("totalLentBorrowed")}
          >
            <MdSsidChart className="buttonChart" />
          </CategoryButton>
        </div>
      </div>

      <div className="dateOptions">
        <CategoryButton onClick={() => (menu.value = "cycle")}>
          <div className="height"></div>
          <span>{Frequency[selectedCycle.value]}</span>
          <div className="height"></div>
        </CategoryButton>
        <CategoryButton onClick={() => (menu.value = "year")}>
          <div className="height"></div>
          <span>{selectedYear.value}</span>
          <div className="height"></div>
        </CategoryButton>
        <CategoryButton onClick={() => (menu.value = "currencyOptions")}>
          <div className="height"></div>
          <span>{currency.value}</span>
          <div className="height"></div>
        </CategoryButton>

      </div>

      <div className="chartWrapper">
        <div className="chart">
          {selectedChart === "cumulativeSpending" && (
            <CumulativeSpending
              selectedCycle={selectedCycle}
              selectedYear={selectedYear}
              currentWeekIndex={currentWeekIndex}
              monthsAndDaysArrays={monthsAndDaysArrays}
              cyclehaschanged={cyclehaschanged}
              allWeeksPerYear={allWeeksPerYear}
              menu={menu}
              selectedTimeCycleIndex={selectedTimeCycleIndex}
              startDate={startDate}
              endDate={endDate}
              currency={currency.value}
            />
          )}
          {selectedChart === "barChart" && (
            <BarChart
              selectedCycle={selectedCycle}
              selectedYear={selectedYear}
              currentWeekIndex={currentWeekIndex}
              monthsAndDaysArrays={monthsAndDaysArrays}
              cyclehaschanged={cyclehaschanged}
              allWeeksPerYear={allWeeksPerYear}
              menu={menu}
              selectedTimeCycleIndex={selectedTimeCycleIndex}
              startDate={startDate}
              endDate={endDate}
              currency={currency.value}
            />
          )}
          {selectedChart === "totalLentBorrowed" && (
            <TotalLentBorrowed
              selectedCycle={selectedCycle}
              selectedYear={selectedYear}
              currentWeekIndex={currentWeekIndex}
              monthsAndDaysArrays={monthsAndDaysArrays}
              cyclehaschanged={cyclehaschanged}
              allWeeksPerYear={allWeeksPerYear}
              menu={menu}
              selectedTimeCycleIndex={selectedTimeCycleIndex}
              startDate={startDate}
              endDate={endDate}
              currency={currency.value}
            />
          )}
        </div>
      </div>

      <MenuAnimationBackground menu={menu} />

      <AnalyticsCycleSelectionAnimation menu={menu} header="Select Cycle">
        <CycleOptions
          menu={menu}
          selectedCycle={selectedCycle}
          cyclehaschanged={cyclehaschanged}
        />
      </AnalyticsCycleSelectionAnimation>

      <AnalyticsYearSelectionAnimation menu={menu} header="Select Year">
        <Years menu={menu} selectedYear={selectedYear} selectedTimeCycleIndex={selectedTimeCycleIndex} />
      </AnalyticsYearSelectionAnimation>

      <AnalyticsTimePeriodSelectionAnimation
        menu={menu}
        header={
          selectedCycle.value === Frequency.Monthly
            ? "Select Month"
            : "Select Week"
        }
      >
        <PeriodOption
          menu={menu}
          selectedCycle={selectedCycle}
          selectedTimeCycleIndex={selectedTimeCycleIndex}
          monthsAndDaysArrays={monthsAndDaysArrays}
        />
      </AnalyticsTimePeriodSelectionAnimation>

      <CurrencyOptionsAnimation
        menu={menu}
        clickHandler={handldeCurrencyOptionsClick}

      />


    </StyledAnalytics>
  );
}
