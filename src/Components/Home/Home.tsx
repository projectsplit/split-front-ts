import React, { useState } from "react";
import { StyledHomepage, HomeWrapper } from "./Home.Styled";
import LogoStripe from "./LogoStripe/LogoStripe";
import OptionsContainer from "../OptionsContainer/OptionsContainer";
import TreeAdjustedContainer from "../TreeAdjustedContainer/TreeAdjustedContainer";
import Recommendation from "./Recommendation/Recommendation";
import OnTrackMessage from "./OnTrackMessage/OnTrackMessage";
import { BsBarChartFill } from "react-icons/bs";
import { BsFillPiggyBankFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import OptionButton from "./SelectionButton/SelectionButton";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../apis/api";
import { ItemBuilder } from "../../helpers/ItemBuilder";
import { createUserPendingTransactionsFromTotals } from "../../helpers/createUserPendingTransactionsFromTotals";
import { GroupsTotalAmountsResponse } from "../../types";
import Spinner from "../Spinner/Spinner";

export default function Home() {
  const navigate = useNavigate();
  const [showAdvice, setShowAdvice] = useState(true);

  const { error, data, refetch, isSuccess, isFetching, isLoading } =
    useQuery<GroupsTotalAmountsResponse>({
      queryKey: ["home"],
      queryFn: api.getGroupsTotalAmounts,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  return (
    <HomeWrapper>
      <StyledHomepage>
        <LogoStripe />
        <div className="welcomeStripe">
          Welcome {"sessionData.userNickname"}
        </div>
        {isFetching ? (
          <Spinner />
        ) : (
          <div className="optionsStripe">
            {showAdvice && (
              <OptionsContainer hasarrow={false}>
                <OnTrackMessage
                  amount="£21.5"
                  onClick={() => setShowAdvice(false)}
                />
                {/* <Recommendation days={2} offBudgetAmount="$3" reduceAmount="$2"/> */}
              </OptionsContainer>
            )}
            <div className="mostRecent">
              <div className="mostRecentMsg">Most recent</div>

              <TreeAdjustedContainer
                onClick={() => console.log("goto group")}
                hasarrow={true}
                items={[
                  <div className="groupsInfo">
                    <strong>You</strong> are owed{" "}
                    <span className="owed">£56.00</span>
                  </div>,
                  <div className="groupsInfo">
                    <strong>You</strong> owe <span className="owe">$5.65</span>
                  </div>,
                ]}
              >
                <div className="groupName">Kythnos</div>
              </TreeAdjustedContainer>
            </div>
            {!isLoading && !isFetching && data?.numberOfGroups === 0 ? (
              <OptionButton
                name="Groups"
                description="Keep track of your shared finances "
              >
                <i className="group icon" />
              </OptionButton>
            ) : (
              <TreeAdjustedContainer
                hasarrow={true}
                onClick={() => navigate("/groups/active")}
                items={ItemBuilder(
                  createUserPendingTransactionsFromTotals(data)
                )}
              >
                <div className="groups">
                  <i className="group icon">
                    <span className="groupCount">{data?.numberOfGroups}</span>
                  </i>
                  <div className="groupName">Groups</div>
                </div>
              </TreeAdjustedContainer>
            )}
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
              onClick={() => navigate("/budget")}
            >
              <BsFillPiggyBankFill className="budgetIcon" />
            </OptionButton>
          </div>
        )}
      </StyledHomepage>
    </HomeWrapper>
  );
}
