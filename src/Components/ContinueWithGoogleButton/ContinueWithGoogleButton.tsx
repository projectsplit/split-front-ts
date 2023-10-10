import React from "react";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../apis/authApi";
import { StyledContinueWithGoogleButton } from "./ContinueWithGoogle.styled";

export default function ContinueWithGoogleButton() {
  const { isFetching, error, data, isFetched } = useQuery<string>({
    queryKey: ["access", "getGoogleUrl"],
    queryFn: authApi.getGoogleUrl,
  });

  const goToGoogleScreen = () => {
    if (data) {
      window.location.href = data;
    }
  };

  return (
    <StyledContinueWithGoogleButton
      onClick={goToGoogleScreen}
      disabled={!isFetched || !!error || isFetching}
    >
      <div className="googleLogo">G</div>
      <div className="prompt">Continue with Google</div>
    </StyledContinueWithGoogleButton>
  );
}
