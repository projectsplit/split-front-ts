import React, { useState } from "react";
import { api } from "../../../apis/api";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BudgetInfoResponse, BudgetType } from "../../../types";

import ProgressBar from "./../ProgressBar/ProgressBar";
import { BudgetInfoMessage } from "../../../helpers/BudgetInfoMessage";
import Spinner from "../../Spinner/Spinner";
import { useTheme } from "styled-components";
import { CSSTransition } from "react-transition-group";
import ConfirmationForBudgetDeletion from "./../ConfirmationForBudgetDeletion/ConfirmationForBudgetDeletion";
import "../../styles/freakflags/freakflags.css";
import { StyledCurrentBudget } from "./CurrentBudget.styled";
import useMonthlyBudgetInfo from "../../../hooks/useMonthlyBudgetInfo";
import SubmitButton from "../../SubmitButton/SubmitButton";

export default function CurrentBudget() {
  const [menu, setMenu] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const queryKey = ["budget", BudgetType.Monthly];
  const theme = useTheme();
  const nodeRef = React.useRef(null);

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

  const { isFetching } = useMonthlyBudgetInfo(BudgetType.Monthly);

  const removeBudget = async () => {
    deleteBudget.mutate({});
    setMenu(null);
    queryClient.invalidateQueries(queryKey);
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
            <SubmitButton
              onClick={()=>navigate("/budget/create")}
            >
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
        </>
      )}
    </StyledCurrentBudget>
  );
}
