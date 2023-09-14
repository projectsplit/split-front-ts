import React from "react";
import { StyledOverspentMessage } from "./OverspentMessage.styled";
import IonIcon from "@reacticons/ionicons";
import { OverspentMessageProps  } from "../../interfaces";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";

export default function OverspentMessage({ onClick,offBudgetAmount, style,currency,overspentBy,days}: OverspentMessageProps ) {
  
  return (
    <StyledOverspentMessage style={style} >
      <div className="main">
        {/* <div className="header">Recommendation</div> */}
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon name="warning-outline" className="warning" />
          </div>
          <div className="paragraphs">
            <div className="firstParagraph">
             You have overspent by <strong className="amount">{displayCurrencyAndAmount(overspentBy,currency)}</strong>. 
            </div>
            <div className="secondParagraph">
              By spending at this rate you will be off budget by <strong className="amount">{displayCurrencyAndAmount(offBudgetAmount,currency)}</strong> in <strong>{days}</strong> days
            </div>
          </div>
        </div>
        <div className="closeButton" onClick={onClick}>
          <IonIcon name="close-outline" className="close" />
        </div>
      </div>
    </StyledOverspentMessage>
  );
}
