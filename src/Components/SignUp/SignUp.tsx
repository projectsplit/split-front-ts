import React from 'react'
import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from "@tanstack/react-query"
import { RequestSignUpRequest, RequestSignUpResponse } from "../../types"
import { authApi } from '../../apis/authApi'

export default function SignUp() {

  const [signUpEmail, setSignUpEmail] = useState<string>("")
  const [signUpErrors, setSignUpErrors] = useState<{ field: string, errorMessage: string }[]>([])
  const [nickname, setNickname] = useState<string>("")
  const [networkError, setNetworkError] = useState<string>("")
  const navigate = useNavigate()

  const requestSignUpMutation = useMutation<RequestSignUpResponse, any, RequestSignUpRequest>({
    mutationKey: ['sign-up'],
    mutationFn: authApi.requestSignUp,
    onSuccess: () => navigate('/continue'),
    onError: (error) => {
      if (error.code === "ERR_NETWORK") {
        setNetworkError(error.message + ": Check your internet connection");
      }
      if (error.response.status === 400) {
        console.log(error.response.data)
        if (Array.isArray(error.response.data)) setSignUpErrors(error.response.data)
        else setSignUpErrors([{ field: "User", errorMessage: error.response.data }])
      }
    }
  });

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(e.target.value)
  }

  const changeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
  }

  const submitSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setSignUpErrors([])
    setNetworkError("")
    requestSignUpMutation.mutate({
      email: signUpEmail,
      nickname: nickname
    })
  }


  return (
    <div>
      <input
        inputMode='email'
        value={signUpEmail}
        placeholder='john@rambo.com'
        onChange={e => changeEmail(e)}
      />
      <div>
        {signUpErrors.map((err) => {
          if (err.field === "Email") return err.errorMessage
        })}
      </div>
      <input
        inputMode='text'
        value={nickname}
        placeholder='john rambo'
        onChange={e => changeNickname(e)}
      />
      <div>
        {signUpErrors.map((err) => {
          if (err.field === "Nickname" || "User") return err.errorMessage
        })}
      </div>
      <button
        disabled={requestSignUpMutation.isLoading}
        onClick={(e) => submitSignUp(e)}>
        {requestSignUpMutation.isLoading ? "Loading..." : "Submit"}
      </button>
      <div>{networkError}</div>

      <Link to='/signin'>
        <div>
          Sign In
        </div>
      </Link>
    </div>
  )
}
