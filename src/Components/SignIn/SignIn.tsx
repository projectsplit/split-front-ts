import React from 'react'
import { useMutation } from "@tanstack/react-query"
import { useState } from 'react'
import { SignInWithEmailLinkRequest, SignInWithEmailLinkResponse } from "../../types"
import { authApi } from '../../apis/authApi'
import { setAccessToken } from '../../util/accessToken'

export default function SignIn() {

  const [signInEmail, setSignInEmail] = useState<string>("")

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignInEmail(e.target.value)
  }

  const signInWithEmailLinkMutation = useMutation<SignInWithEmailLinkResponse, any, SignInWithEmailLinkRequest>({
    mutationKey: ['lala'],
    mutationFn: authApi.signInWithEmailLink,
    onSuccess: (response: SignInWithEmailLinkResponse) => setAccessToken(response as string),
    onError: () => console.log("onError")
  });

  const submitSignIn = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    signInWithEmailLinkMutation.mutate({
      email: signInEmail
    })
  }

  return (
    <div>
      <input
        inputMode='email'
        value={signInEmail}
        placeholder='john@rambo.com'
        onChange={changeEmail}
      />
      <button
        disabled={signInWithEmailLinkMutation.isLoading}
        onClick={submitSignIn}>
        {signInWithEmailLinkMutation.isLoading ? "Loading..." : "Submit"}
      </button>
    </div >
  )
}
