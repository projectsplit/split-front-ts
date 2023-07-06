import React, { useEffect } from "react";
import { StyledContinue } from "./ContinueWithEmailLink.styled";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../apis/authApi";
import { useNavigate } from "react-router-dom";
import { setAccessToken, setSessionData } from "../../util/accessToken";
import SubmitButton from "../SubmitButton/SubmitButton";
import WelcomeHeader from "../WelcomeHeader/WelcomeHeader";
import { LoadingSpinner } from "../styles/loadingSpinner";


export default function ContinueWithEmailLink() {
  const navigate = useNavigate();

  const { error, data, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["emailContinue"],
    queryFn: () => authApi.emailContinue(),
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setAccessToken(data.accessToken as string);
      setSessionData(data.sessionData);
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <StyledContinue>
      <WelcomeHeader />
      <div className="infoContainer">
        <div>
          <div className="infoMessage">A link has been sent to your email.</div>
          <div className="infoMessage"> Click it to continue.</div>
        </div>
        {!isFetching && (
          <SubmitButton disabled={isFetching} onClick={() => refetch()}>
            Continue
          </SubmitButton>
        )}
        {isFetching && (
          <SubmitButton disabled={isFetching} onClick={() => refetch()}>
            <LoadingSpinner name="sync" fontSize={18} />
          </SubmitButton>
        )}
      </div>
    </StyledContinue>
  );
}
