import React from 'react'
import { useState, useEffect } from 'react'
// import { submitSignIn } from "./utils"
import { useCreateRequestSignInMutation } from '../../api/mutations'

export default function SignIn() {

  const [signInEmail, setSignInEmail] = useState<string>("")
  const requestSignInMutation = useCreateRequestSignInMutation();

  const changeEmail = (e: any) => {
    setSignInEmail(e.target.value)
  }

  const { isLoading, isSuccess, isError, data } = requestSignInMutation

  const submitSignIn = async (e: any, email: string) => {
    e.preventDefault()
    requestSignInMutation.mutate(email)

    // navigate('/continue ')
  }

  if (isSuccess) {
    // Mutation was successful
    console.log("isSuccess:", data);
    // You can navigate to the next page here
  }

  if (isError) {
    // An error occurred during the mutation
    console.error("isError:", requestSignInMutation.error.response.status);
  }

  return (
    <div>

      <input
        inputMode='email'
        value={signInEmail}
        placeholder='john@rambo.com'
        onChange={e => changeEmail(e)}
      />
      <button
        disabled={isLoading}
        onClick={(e) => submitSignIn(e, signInEmail)}>
        {isLoading ? "Loading..." : "Submit"}
      </button>

    </div >
  )
}
