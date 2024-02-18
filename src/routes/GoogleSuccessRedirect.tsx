import React, { useEffect, useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { authApi } from '../apis/authApi'
import { useNavigate } from 'react-router-dom'
import { setAccessToken, setSessionData } from '../util/accessToken'
import { ContinueReponse, GoogleContinueRequest } from '../types'

export default function GoogleSuccessRedirect() {
  
  const [googleErrorMessage, setGoogleErrorMessage] = useState<string>('')

  const navigate = useNavigate()
  const getAccessTokenWithGoogle = useMutation<ContinueReponse, any, GoogleContinueRequest>({
    mutationKey: ["googleRedirect"],
    mutationFn: authApi.googleConnect,
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
    getAccessTokenWithGoogle.mutate({ RedirectUrlSearchParameters: window.location.search })
  }, [])

  return (
    <>{googleErrorMessage}</>

  )
}
