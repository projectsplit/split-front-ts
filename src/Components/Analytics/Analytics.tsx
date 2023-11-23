import React, { useState } from "react";
import { StyledAnalytics } from "./Analytics.styled";
import TopBarWithBackButton from "../../layouts/TopBarWithBackButton/TopBarWithBackButton";
import { useNavigate } from "react-router-dom";
import CategoryButton from "../CategoryButton/CategoryButton";
import { MdOutlineShowChart } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdSsidChart } from "react-icons/md";
import logo from "../../components/styles/svg/office-chart-line-forecast.svg";
import { CumulativeSpending } from "./Charts/CumulativeSpending/CumulativeSpending";
import { AverageSpending } from "./Charts/AverageSpending/AverageSpending";
import {TotalLentBorrowed} from "./Charts/TotalLentBorrowed/TotalLentBorrowed";
import { BarChart } from "./Charts/BarChart/BarChart";

export default function Analytics() {
  const [selectedChart, setSelectedChart] =
    useState<string>("cumulativeSpending");

  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(`/`);
  };

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

          <CategoryButton
            selected={selectedChart === "averageSpending"}
            onClick={() => setSelectedChart("averageSpending")}
          >
            <img src={logo} className="dashed" />
          </CategoryButton>
        </div>
        <CategoryButton>Monthly</CategoryButton>
      </div>

      {/* <div className="cumulativeSpending">
        <div className="chart">
          <CumulativeSpending />
        </div>
      </div> */}

      <div className="chartWrapper">
        <div className="chart">
          {selectedChart === "cumulativeSpending" && <CumulativeSpending />}
          {selectedChart === "barChart" && <BarChart />}
          {selectedChart === "totalLentBorrowed" && <TotalLentBorrowed />}
          {selectedChart === "averageSpending" && <AverageSpending />}
        </div>
      </div>

      <div className="period">April</div>
    </StyledAnalytics>
  );
}
