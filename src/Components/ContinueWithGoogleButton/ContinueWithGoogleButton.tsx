import React from 'react'
import { useQuery } from "@tanstack/react-query"
import { authApi } from '../../apis/authApi'

export default function ContinueWithGoogleButton() {

  const { isFetching, error, data, isFetched } = useQuery<string>({
    queryKey: ["access", "getGoogleUrl"],
    queryFn: authApi.getGoogleUrl,
  })

  const goToGoogleScreen = () => {
    if (data) {
      window.location.href = data
    }
  }

  return (
    <button onClick={goToGoogleScreen} disabled={!isFetched || !!error || isFetching}>Continue with Google</button>
  )
}