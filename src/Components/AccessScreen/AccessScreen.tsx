import React from "react"
import IonIcon from "@reacticons/ionicons"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { authApi } from "../../apis/authApi"
import { EmailInitiateRequest } from "../../types"
import { AxiosResponse } from "axios"
import ContinueWithGoogleButton from "../ContinueWithGoogleButton/ContinueWithGoogleButton"
import WelcomeHeader from "../WelcomeHeader/WelcomeHeader"
import SubmitButton from "../SubmitButton/SubmitButton"
import { StyledAccessScreen } from "./AccessScreen.styled"
import Input from "../Input/Input"
import { LoadingSpinner } from "../styles/loadingSpinner"
import GoogleSignInButton from "../GoogleSignInButton/GoogleSignInButton"

export default function AccessScreen() {
  const [signInEmail, setSignInEmail] = useState<string>("")
  const [signInError, setSigninError] = useState<string>("")
  const [networkError, setNetworkError] = useState<string>("")
  const [googleUrl, setGoogleUrl] = useState<string>("")

  const navigate = useNavigate()

  const emailInitiateMutation = useMutation<
    AxiosResponse<any, any>,
    any,
    EmailInitiateRequest
  >({
    mutationKey: ["emailInitiate"],
    mutationFn: authApi.emailSendLink,
    onSuccess: () => navigate("/email-continue"),
    onError: (error) => {
      if (error.code === "ERR_NETWORK") {
        setNetworkError(error.message + ": Check your internet connection")
      }
      if (error.response.status === 400) {
        if (Array.isArray(error.response.data))
          setSigninError(error.response.data.at(-1).errorMessage)
        else setSigninError(error.message)
      }
      if (error.response.status === 401) {
        setSigninError(
          "No account associated with this email address was found"
        )
      }
    },
  })

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(e.target.value)
  }

  const submitSignIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSigninError("")
    setNetworkError("")
    emailInitiateMutation.mutate({
      email: signInEmail,
    })
  }

  return (
    <StyledAccessScreen>
      <WelcomeHeader />
      <div className="loginBox">
        <div className="promptMsg">Enter your email to sign in.</div>
        <div className="controlsContainer">
          <div className="mailbox">
            <Input
              inputMode="email"
              value={signInEmail}
              error={signInError ? true : false}
              placeholder="user@mail.com"
              onChange={(e) => changeEmail(e)}
            />
            <div className="mailmsg">{signInError}&nbsp</div>
          </div>
          {!emailInitiateMutation.isLoading && (
            <SubmitButton
              onClick={(e: React.FormEvent<HTMLButtonElement>) =>
                submitSignIn(e)
              }
            >
              Sign In
            </SubmitButton>
          )}

          {emailInitiateMutation.isLoading && (
            <SubmitButton>
              <LoadingSpinner name="sync" fontSize={18} />
            </SubmitButton>
          )}

          <div className="mailmsg">{networkError}</div>
          <div className="or ">OR</div>
          <ContinueWithGoogleButton />
          <div className="mailmsg">{networkError}</div>
        </div>
      </div>
      <GoogleSignInButton />
    </StyledAccessScreen>
  )
}
