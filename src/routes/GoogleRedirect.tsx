import React, { useEffect, useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { googleAuthApi } from '../apis/googleAuthApi'
import { useNavigate } from 'react-router-dom'
import { setAccessToken, setSessionData } from '../util/accessToken'
import { ContinueSignInReponse, ContinueWithGoogleRequest } from '../types'

export default function GoogleRedirect() {
  const [googleErrorMessage, setGoogleErrorMessage] = useState<string>('')

  const navigate = useNavigate()
  const getAccessTokenWithGoogle = useMutation<ContinueSignInReponse, any, ContinueWithGoogleRequest>({
    mutationKey: ["googleRedirect"],
    mutationFn: googleAuthApi.continueWithGoolge,
    onError: (error) => {
      setGoogleErrorMessage(error.response.data)
    }
  })

  //error handling

  if (getAccessTokenWithGoogle.isSuccess) {
    setAccessToken(getAccessTokenWithGoogle.data.accessToken)
    setSessionData(getAccessTokenWithGoogle.data.sessionData)
    navigate("/")
  }
  
  useEffect(() => {
    console.log()
    getAccessTokenWithGoogle.mutate({ RedirectUrlSearchParameters: window.location.search })
  }, [])


  return (
    <>{googleErrorMessage}</>

  )
}
