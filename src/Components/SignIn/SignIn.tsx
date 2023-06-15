import React from 'react'
import { useState, useEffect } from 'react'
// import { submitSignIn } from "./utils"
import { useNavigate } from 'react-router-dom'
import { useCreateRequestSignInMutation } from '../../api/mutations'

export default function SignIn() {

  const [signInEmail, setSignInEmail] = useState<string>("")
  const navigate = useNavigate()

  const changeEmail = (e: any) => {
    setSignInEmail(e.target.value)
  }

  const requestSingInMutation = useCreateRequestSignInMutation()

  const submitSignIn = async (e: any, email: string) => {
    e.preventDefault()
    requestSingInMutation.mutate(email)
    console.log(requestSingInMutation.status)
    
    // navigate('/continue ')
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
        disabled={requestSingInMutation.isLoading}
        onClick={(e) => submitSignIn(e, signInEmail)}>
        {requestSingInMutation.isLoading ? "Loading..." : "Submit"}
      </button>

    </div >
  )
}
