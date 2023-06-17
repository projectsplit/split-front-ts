import React from 'react'
import { useState } from 'react'
import { useCreateRequestSignInMutation } from '../../api/mutations'
import { Link, useNavigate } from 'react-router-dom'

export default function SignIn() {

  const [signInEmail, setSignInEmail] = useState<string>("")
  const [signInError, setSigninError] = useState<string>("")
  const [networkError, setNetworkError] = useState<string>("")


  const navigate = useNavigate()

  const requestSignInMutation = useCreateRequestSignInMutation((error) => {

    if (error.code === "ERR_NETWORK") {
      setNetworkError(error.message + ": Check your internet connection");
    }
    if (error.response.status === 400) {
      console.log(400)
      if (Array.isArray(error.response.data)) setSigninError(error.response.data.at(-1).errorMessage);
      else setSigninError(error.message)
    }
    if (error.response.status === 401) {
      console.log(401)
      setSigninError("No account associated with this email address was found");
    }
  },
    (success) => {
      navigate('/continue')
    });

  const changeEmail = (e: any) => {
    setSignInEmail(e.target.value)
  }

  const { isLoading, isSuccess, isError, data, error } = requestSignInMutation


  const submitSignIn = async (e: any, email: string) => {
    e.preventDefault()
    setSigninError("")
    setNetworkError("")
    requestSignInMutation.mutate(email)
  }

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
        disabled={isLoading}
        onClick={(e) => submitSignIn(e, signInEmail)}>
        {isLoading ? "Loading..." : "Submit"}
      </button>
      <div>{networkError}</div>


      <Link to='/signup'>
        <div>
          Create new account
        </div>
      </Link>

    </div >
  )
}
