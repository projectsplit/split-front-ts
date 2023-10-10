import React from "react";
import { StyledLogoStripe } from "./LogoStripe.styled";
import QRscanner from "../../QRscanner/QRscanner";
import UserOptionsButton from "../../UserOptionsButton/UserOptionsButton";

export default function LogoStripe() {
  return (
    <StyledLogoStripe>
      <div className="mainContainer">
        <div className="logo">α</div>
        <div className="QRandUserOptions">
          <QRscanner />
          <UserOptionsButton>{"sessionData.userNickname"}</UserOptionsButton>
        </div>
      </div>
    </StyledLogoStripe>
  );
}
