import React from "react";
import { StyledHomepage, HomeWrapper } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import IonIcon from "@reacticons/ionicons";

export default function Home() {
  return (
    <HomeWrapper>
      <StyledHomepage>
        <LogoStripe />
        <div className="welcomeStripe">
          Welcome {"sessionData.userNickname"}
        </div>
        <div className="optionsStripe">
          <OptionsContainer>
            <div className="header">Recommendation</div>
            <div className="signParagraphWrap">
              <div className="sign">
                <IonIcon name="warning-outline" className="warning" />
              </div>
              <div className="paragraphs">
                <div className="firstParagraph">
                  Reduce your spending by £2.18 per day to not exceed your
                  monthly cap.
                </div>
                <div className="secondParagraph">
                  At this rate you will reach your cap in 9 days and you will be
                  off budget by £21.8 at the end of the month.
                </div>
              </div>
            </div>
            <div className="closeButton">
              <IonIcon name="close-outline" className="close" />
            </div>
          </OptionsContainer>
          <div className="mostRecent">
            <div className="mostRecentMsg">Most recent</div>
            <OptionsContainer>most recent</OptionsContainer>
          </div>
          <OptionsContainer>groups</OptionsContainer>
          <OptionsContainer>analytics</OptionsContainer>
          <OptionsContainer>set budget</OptionsContainer>
        </div>
      </StyledHomepage>
    </HomeWrapper>
  );
}
