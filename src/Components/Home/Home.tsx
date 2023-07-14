import React from "react";
import { StyledHomepage, HomeWrapper } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import TreeAdjustedContainer from "./TreeAdjustedContainer/TreeAdjustedContainer";
import Recommendation from "./Recommendation/Recommendation";
import OnTrackMessage from "./OnTrackMessage/OnTrackMessage";
import Tree from "../Tree/Tree";
import { BsBarChartFill } from "react-icons/bs";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import OptionButton from "./SelectionButton/SelectionButton";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <HomeWrapper>
      <StyledHomepage>
        <LogoStripe />
        <div className="welcomeStripe">
          Welcome {"sessionData.userNickname"}
        </div>
        <div className="optionsStripe">
          <OptionsContainer hasArrow={false}>
            <OnTrackMessage
              amount="£21.5"
              onClick={() =>
                console.log("function to close recommendation box")
              }
            />
          </OptionsContainer>
          <div className="mostRecent">
            <div className="mostRecentMsg">Most recent</div>
            <TreeAdjustedContainer
              onClick={() => console.log("goto group")}
              hasArrow={true}
            >
              <div className="groupName">Kythnos</div>
              <Tree
                items={[
                  <div className="groupsInfo">
                    <strong>You</strong> are owed{" "}
                    <span className="owed">£56.00</span>
                  </div>,
                  <div className="groupsInfo">
                    <strong>You</strong> owe <span className="owe">$5.65</span>
                  </div>,
                ]}
              />
            </TreeAdjustedContainer>
          </div>
          <TreeAdjustedContainer
            hasArrow={true}
            onClick={() => navigate("/groups")}
          >
            <div className="groups">
              <i className="group icon">
                <span className="groupCount">3</span>
              </i>
              <div className="groupName">Groups</div>
            </div>
            <Tree
              items={[
                <div className="groupsInfo">
                  <strong>You</strong> are owed{" "}
                  <span className="owed">£56.00</span>
                </div>,
                <div className="groupsInfo">
                  <strong>You</strong> owe <span className="owe">$5.65</span>
                </div>,
              ]}
            />
          </TreeAdjustedContainer>

          {/* <OptionButton name="Groups" description="Track your shared finances ">
            <i className="group icon"/>
          </OptionButton> */}

          <OptionButton
            name="Personal"
            description="Your personal expense tracker"
          >
            <BsFillPersonFill className="personalIcon" />
          </OptionButton>

          <OptionButton
            name="Analytics"
            description="View your spending trends"
          >
            <BsBarChartFill className="analyticsIcon" />
          </OptionButton>

          <OptionButton
            name="Budget"
            description="Set up a spending cap or goal"
          >
            <BsFillPiggyBankFill className="budgetIcon" />
          </OptionButton>
        </div>
      </StyledHomepage>
    </HomeWrapper>
  );
}
