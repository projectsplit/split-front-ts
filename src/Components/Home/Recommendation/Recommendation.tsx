import React from "react";
import { StyledRecommendation } from "./Recommendation.styled";
import IonIcon from "@reacticons/ionicons";
import { RecommendationProps } from "../../../interfaces";

export default function Recommendation({ onClick }: RecommendationProps) {
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
              Reduce your spending by £2.18 per day to not exceed your monthly
              cap.
            </div>
            <div className="secondParagraph">
              At this rate you will reach your cap in 9 days and you will be off
              budget by £21.8 at the end of the month.
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
