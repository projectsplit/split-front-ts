import React, { useEffect, useState } from "react";
import { api } from "../../../apis/api";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BudgetInfoResponse, BudgetType } from "../../../types";

import ProgressBar from "./../ProgressBar/ProgressBar";
import { BudgetInfoMessage } from "../../../helpers/BudgetInfoMessage";
import Spinner from "../../Spinner/Spinner";
import { useTheme } from "styled-components";
import { CSSTransition } from "react-transition-group";
import ConfirmationForBudgetDeletion from "./../ConfirmationForBudgetDeletion/ConfirmationForBudgetDeletion";
import "../../styles/freakflags/freakflags.css";
import { StyledCurrentBudget } from "./CurrentBudget.styled";
import useBudgetInfo from "../../../hooks/useBudgetInfo";
import SubmitButton from "../../SubmitButton/SubmitButton";
import ManageBudgetMenu from "../ManageBudgetMenu/ManageBudgetMenu";

export default function CurrentBudget() {
  const [menu, setMenu] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryKey = ["budget"];
  const theme = useTheme();
  const nodeRef = React.useRef(null);

  const { isFetching, data } = useBudgetInfo();

  useEffect(() => { //prevents user from landing on this component after budget is deleted using <- of browser
    if (!isFetching && !data?.budgetSubmitted) {
      navigate("/budget/create");
    }
  }, []);

  const deleteBudget = useMutation<any, any, any>({
    mutationKey: ["budget", "delete"],
    mutationFn: api.deleteBudget,
    onError: (error) => {
      // setSubmitBudgetErrors(error.response.data);
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const removeBudget = async () => {
    deleteBudget.mutate({});
    setMenu(null);
    queryClient.invalidateQueries(queryKey);
    navigate("/budget/create");
  };

  const querydata = queryClient.getQueryData(queryKey) as BudgetInfoResponse;

  return (
    <StyledCurrentBudget>
      {isFetching && <Spinner />}

      {!isFetching && (
        <>
          <div className="topBar">
            <div className="backButtonContainer">
              <BiArrowBack
                className="backButton"
                onClick={() => navigate("/")}
              />
            </div>
            <div className="descr">Budget</div>
          </div>

          {querydata && (
            <div className="spentInfo">
              {querydata.budgetSubmitted && (
                <>
                  <ProgressBar data={querydata} />
                  {BudgetInfoMessage(theme, false, querydata)}
                </>
              )}
            </div>
          )}

          <div className="submitButton">
            <SubmitButton onClick={() => setMenu("manageBudgetMenu")}>
              Manage Budget
            </SubmitButton>
          </div>

          <CSSTransition
            nodeRef={nodeRef}
            onClick={() => setMenu(null)}
            in={Boolean(menu)}
            timeout={0}
            unmountOnExit
          >
            <div
              style={{
                position: "fixed",
                left: "0px",
                top: "0px",
                height: "100%",
                width: "100%",
                backgroundColor: "black",
                opacity: "0.7",
              }}
            />
          </CSSTransition>

          <CSSTransition
            in={menu === "deleteBudgetConfirmation"}
            timeout={100}
            classNames="bottomslide"
            unmountOnExit
          >
            <ConfirmationForBudgetDeletion
              setMenu={setMenu}
              removeBudget={removeBudget}
            />
          </CSSTransition>

          <CSSTransition
            in={menu === "manageBudgetMenu"}
            timeout={100}
            classNames="bottomslide"
            unmountOnExit
          >
            <ManageBudgetMenu setMenu={setMenu} />
          </CSSTransition>
        </>
      )}
    </StyledCurrentBudget>
  );
}
