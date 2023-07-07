import React from "react";
import { StyledHomepage, HomeWrapper } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import MostRecentContainer from "./MostRecentContainer/MostRecentContainer";
import Recommendation from "./Recommendation/Recommendation";
import Tree from "../Tree/Tree";
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
            <Recommendation
              onClick={() =>
                console.log("function to close recommendation box")
              }
            />
          </OptionsContainer>
          <div className="mostRecent">
            <div className="mostRecentMsg">Most recent</div>
            <MostRecentContainer onClick={() => console.log("goto group")}>
            
                <div className="groupName">Italy</div>
                <Tree items={["You are owed £56.00", "You owe $5.65"]} />
                <IonIcon name="chevron-forward-outline" className="arrow" />
           
            </MostRecentContainer>
          </div>

          <OptionsContainer>groups</OptionsContainer>
          <OptionsContainer>analytics</OptionsContainer>
          <OptionsContainer>set budget</OptionsContainer>
        </div>
      </StyledHomepage>
    </HomeWrapper>
  );
}
