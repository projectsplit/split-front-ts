import React from "react";
import { StyledAnalytics } from "./Analytics.styled";
import TopBarWithBackButton from "../../layouts/TopBarWithBackButton/TopBarWithBackButton";
import { useNavigate } from "react-router-dom";

export default function Analytics() {
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
     
    </StyledAnalytics>
  );
}
