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
import { useSignal } from "@preact/signals-react";
import MenuAnimationBackground from "../MenuAnimations/MenuAnimationBackground";
import CycleOptions from "./CycleOption/CycleOption";
import Years from "./YearOption/YearOption";
import AnalyticsCycleSelectionAnimation from "../MenuAnimations/AnalyticsCycleSelectionAnimation";
import AnalyticsYearSelectionAnimation from "../MenuAnimations/AnalyticsYearSelectionAnimation";
import { CycleType } from "../../types";
import { useWeeklyDatesMemo } from "./hooks/useWeekyDatesMemo";
import AnalyticsTimePeriodSelectionAnimation from "../MenuAnimations/AnalyticsTimePeriodSelectionAnimation";
import PeriodOption from "./Charts/PeriodOption/PeriodOption";
import { initialiseSelectedTimeCycle } from "./helpers/initialiseSelectedTimeCycle";


export default function Analytics() {
  const [selectedChart, setSelectedChart] =
    useState<string>("cumulativeSpending");

  const selectedCycle = useSignal<CycleType>(CycleType.Monthly);
  const selectedYear = useSignal<number>(new Date().getFullYear());
  const cyclehaschanged = useSignal<boolean>(false);
  const menu = useSignal<string | null>(null);
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(`/`);
  };

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

  useEffect(() => {
    selectedTimeCycleIndex.value = initialiseSelectedTimeCycle(selectedCycle.value, currentWeekIndex, selectedYear.value)
 
  }, [selectedYear.value, selectedCycle.value])


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
          <span>{CycleType[selectedCycle.value]}</span>
          <div className="height"></div>
        </CategoryButton>
        <CategoryButton onClick={() => (menu.value = "year")}>
          <div className="height"></div>
          <span>{selectedYear.value}</span>
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
          selectedCycle.value === CycleType.Monthly
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

      
    </StyledAnalytics>
  );
}
