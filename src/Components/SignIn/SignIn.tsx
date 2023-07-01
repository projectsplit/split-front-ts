import React from 'react'
import { useState } from 'react'
import { useMutation, useQuery } from "@tanstack/react-query"
import { Link, useNavigate } from 'react-router-dom'
import { RequestSignInRequest, RequestSignInResponse } from "../../types"
import { authApi } from '../../apis/authApi'
import { googleAuthApi } from '../../apis/googleAuthApi'

export default function SignIn() {

  const [signInEmail, setSignInEmail] = useState<string>("")
  const [signInError, setSigninError] = useState<string>("")
  const [networkError, setNetworkError] = useState<string>("")


  const navigate = useNavigate()

  const requestSignInMutation = useMutation<RequestSignInResponse, any, RequestSignInRequest>({
    mutationKey: ['sign-in'],
    mutationFn: authApi.requestSignIn,
    onSuccess: () => navigate('/continue'),
    onError: (error) => {
      if (error.code === "ERR_NETWORK") {
        setNetworkError(error.message + ": Check your internet connection");
      }
      if (error.response.status === 400) {
        if (Array.isArray(error.response.data)) setSigninError(error.response.data.at(-1).errorMessage);
        else setSigninError(error.message)
      }
      if (error.response.status === 401) {
        console.log(401)
        setSigninError("No account associated with this email address was found");
      }
    }
  });

  const getGoogleRedirectUrl = useQuery<string>({
    queryKey: ["googleAuth"],
    queryFn: googleAuthApi.getGoogleRedirectUrl,
    enabled: false,

  })

  if (getGoogleRedirectUrl.isSuccess) {
    console.log(getGoogleRedirectUrl?.data)
    window.location.href = getGoogleRedirectUrl?.data
  }

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(e.target.value)
  }

  const submitSignIn = async (e: React.FormEvent<HTMLButtonElement>, email: string) => {
    e.preventDefault()
    setSigninError("")
    setNetworkError("")
    requestSignInMutation.mutate({
      email: signInEmail
    })
  }

  const submitGoogleSignIn = async () => {
    getGoogleRedirectUrl.refetch();
  };


  return (
    <div>

      <input
        inputMode='email'
        value={signInEmail}
        placeholder='john@rambo.com'
        onChange={e => changeEmail(e)}
      />
      <div>{signInError}</div>
      <button
        disabled={requestSignInMutation.isLoading}
        onClick={(e) => submitSignIn(e, signInEmail)}>
        {requestSignInMutation.isLoading ? "Loading..." : "Submit"}
      </button>
      <div>{networkError}</div>
      <button onClick={submitGoogleSignIn}>Google Sign in</button>
      {!getGoogleRedirectUrl.isLoading && !getGoogleRedirectUrl.isRefetching}


      <Link to='/signup'>
        <div>
          Create new account
        </div>
      </Link>

    </div >
  )
}
