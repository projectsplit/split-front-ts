import React from 'react'
import { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '../../apis/authApi'
import { EmailInitiateRequest } from '../../types'
import { AxiosResponse } from 'axios'
import ContinueWithGoogleButton from '../ContinueWithGoogleButton/ContinueWithGoogleButton'

export default function AccessScreen() {

  const [signInEmail, setSignInEmail] = useState<string>("")
  const [signInError, setSigninError] = useState<string>("")
  const [networkError, setNetworkError] = useState<string>("")
  const [googleUrl, setGoogleUrl] = useState<string>("")

  const navigate = useNavigate()

  const emailInitiateMutation = useMutation<AxiosResponse<any, any>, any, EmailInitiateRequest>({
    mutationKey: ['emailInitiate'],
    mutationFn: authApi.emailSendLink,
    onSuccess: () => navigate('/email-continue'),
    onError: (error) => {
      if (error.code === "ERR_NETWORK") {
        setNetworkError(error.message + ": Check your internet connection")
      }
      if (error.response.status === 400) {
        if (Array.isArray(error.response.data)) setSigninError(error.response.data.at(-1).errorMessage)
        else setSigninError(error.message)
      }
      if (error.response.status === 401) {
        console.log(401)
        setSigninError("No account associated with this email address was found")
      }
    }
  })

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(e.target.value)
  }

  const submitSignIn = async (e: React.FormEvent<HTMLButtonElement>, email: string) => {
    e.preventDefault()
    setSigninError("")
    setNetworkError("")
    emailInitiateMutation.mutate({
      email: signInEmail
    })
  }

  return (
    <div>
      <h3>Enter you email</h3>
      <input
        inputMode='email'
        value={signInEmail}
        placeholder='john@rambo.com'
        onChange={e => changeEmail(e)}
      />
      <div>{signInError}</div>
      <button
        disabled={emailInitiateMutation.isLoading}
        onClick={(e) => submitSignIn(e, signInEmail)}>
        {emailInitiateMutation.isLoading ? "Loading..." : "Submit"}
      </button>
      <h3>OR</h3>
      <div>{networkError}</div>
      <ContinueWithGoogleButton />
    </div >
  )
}