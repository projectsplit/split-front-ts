import React from "react";
import { StyledOnTrackMessage } from "./OnTrackMessage.styled";
import { OnTrackMessageProps } from "../../../interfaces";
import IonIcon from "@reacticons/ionicons";

export default function OnTrackMessage({ onClick, amount }: OnTrackMessageProps) {
  return (
  <StyledOnTrackMessage>
     <div className="main">
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon name="information-circle-outline" className="information" />
          </div>
          <div className="paragraphs">
            <div className="firstParagraph">
            You are on target to meeting your spending goal.
            </div>
            <div className="secondParagraph">
              Spending at this rate you will save you <span className="amount">{amount}</span> at the end of the
              month.
            </div>
          </div>
        </div>
        <div className="closeButton" onClick={onClick}>
          <IonIcon name="close-outline" className="close" />
        </div>
      </div>
  </StyledOnTrackMessage>
  );
}
