import React from "react";
import { StyledHomepage, HomeWrapper } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import IonIcon from "@reacticons/ionicons";
import Recommendation from "./Recommendation/Recommendation";

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
            <Recommendation />
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
