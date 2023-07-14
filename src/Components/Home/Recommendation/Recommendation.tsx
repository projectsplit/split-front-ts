import React from "react";
import { StyledRecommendation } from "./Recommendation.styled";
import IonIcon from "@reacticons/ionicons";
import { ReccomendationMessageProps  } from "../../../interfaces";

export default function Recommendation({ onClick,days,offBudgetAmount,reduceAmount }: ReccomendationMessageProps ) {
  return (
    <StyledRecommendation>
      <div className="main">
        <div className="header">Recommendation</div>
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon name="warning-outline" className="warning" />
          </div>
          <div className="paragraphs">
            <div className="firstParagraph">
              Reduce your spending by <span className="amount">{reduceAmount}</span> per day to not exceed
              your monthly cap.
            </div>
            <div className="secondParagraph">
              At this rate you will reach your cap in <strong>{days}</strong> days
              and you will be off budget by <span className="amount">{offBudgetAmount}</span> at the end of the
              month.
            </div>
          </div>
        </div>
        <div className="closeButton" onClick={onClick}>
          <IonIcon name="close-outline" className="close" />
        </div>
      </div>
    </StyledRecommendation>
  );
}
