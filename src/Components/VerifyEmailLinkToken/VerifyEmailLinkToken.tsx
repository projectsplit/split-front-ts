import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { authApi } from "../../apis/authApi";
import { useState } from "react";
import { AxiosError } from "axios";
import { EmailVerifyLinkResponse } from "../../types";
import {
  StyledVerifyToken,
  StyledCheckMark,
  StyledErrorMark,
} from "./VerifyEmailLinkToken.styled";
import WelcomeHeader from "../WelcomeHeader/WelcomeHeader";
import { LoadingSpinner } from "../styles/loadingSpinner";

export default function EmailVerifyLinkToken() {
  const { token } = useParams();
  const [userCreated, setUserCreated] = useState<boolean>(false);

  const { isLoading, error, data, isSuccess, isFetching } = useQuery<
    EmailVerifyLinkResponse,
    AxiosError<any>
  >(
    ["verifyToken", token],
    () => {
      if (token) {
        return authApi.emailVerifyLinkToken(token);
      }
      throw new Error("No token provided");
    },
    {
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  

  useEffect(() => {
    if (isSuccess) {
      setUserCreated(data.userCreated);
    }
  }, [isSuccess]);

  return (
    <StyledVerifyToken>
      <WelcomeHeader />
      <div className="infoContainer">
        {isFetching && <LoadingSpinner name="sync" fontSize={32} />}
        {!isFetching && !error && !userCreated && (
          <div className="message">
            <StyledCheckMark name="checkmark-sharp" />
            <div>You have successfully signed in.</div>
            <div>You can close this tab</div>
          </div>
        )}
        {!isFetching && !error && userCreated && (
          <div className="message">
            <StyledCheckMark name="checkmark-sharp" />
            <div>Your account has been created</div>
            <div>You can close this tab</div>
          </div>
        )}
        {error && (
          <div className="message">
            <StyledErrorMark name="close" />
            {error.response?.data}
          </div>
        )}
      </div>
    </StyledVerifyToken>

  );
}
