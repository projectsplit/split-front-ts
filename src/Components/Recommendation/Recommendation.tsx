import React from "react";
import { StyledRecommendation } from "./Recommendation.styled";
import IonIcon from "@reacticons/ionicons";
import { RecommendationMessageProps  } from "../../interfaces";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";

export default function Recommendation({ onClick,days,offBudgetAmount,reduceAmount, style,currency}: RecommendationMessageProps ) {
  
  return (
    <StyledRecommendation style={style} >
      <div className="main">
        {/* <div className="header">Recommendation</div> */}
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon name="warning-outline" className="warning" />
          </div>
          <div className="paragraphs">
            <div className="firstParagraph">
              Reduce your spending by <span className="amount">{displayCurrencyAndAmount(reduceAmount,currency)}</span> per day to not exceed
              your monthly cap.
            </div>
            <div className="secondParagraph">
              At this rate you will reach your cap in <strong>{days}</strong> days
              and you will be off budget by <span className="amount">{displayCurrencyAndAmount(offBudgetAmount,currency)}</span> at the end of the
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
