import React from 'react'
import { StyledContinue } from './Continue.styled'
import { useMutation } from '@tanstack/react-query'
import { setAccessToken, setSessionData } from '../../util/accessToken'
import { authApi } from '../../apis/authApi'
import { ContinueSignInReponse } from "../../types"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'

export default function Continue() {

  const [continueErrorMessage, setContinueErrorMessage] = useState<string>('')
  const navigate = useNavigate()

  const continueSignInMutation = useMutation<ContinueSignInReponse, any, any>({

    mutationKey: ['continueSignIn'],
    mutationFn: authApi.continueSignIn,
    onSuccess: (response: ContinueSignInReponse) => {
      setAccessToken(response.accessToken as string)
      setSessionData(response.sessionData)
      navigate("/")
    },
    onError: (error) => {
      if (error.response.data === "") setContinueErrorMessage("Unauthorized") //check with status code 401
      else setContinueErrorMessage(error.response.data)
    }
  });

  const { isLoading } = continueSignInMutation

  const continueSignIn = async () => {
    continueSignInMutation.mutate({})
  }

  return (
    <StyledContinue>
      <div >
        A link has been sent to your email.
      </div>
      <div >
        Click it to continue.
      </div>
      <button
        disabled={isLoading}
        onClick={() => continueSignIn()}>
        {isLoading ? "Loading..." : "Continue"}
      </button>
      <div>{continueErrorMessage}</div>
    </StyledContinue>
  )
}
