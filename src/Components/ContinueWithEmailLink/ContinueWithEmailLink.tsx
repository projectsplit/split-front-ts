import React, { useEffect } from 'react'
import { StyledContinue } from './ContinueWithEmailLink.styled'
import { useQuery } from '@tanstack/react-query'
import { authApi } from '../../apis/authApi'
import { useNavigate } from 'react-router-dom'
import { setAccessToken, setSessionData } from '../../util/accessToken'

export default function ContinueWithEmailLink() {

  const navigate = useNavigate()
  
  const { error, data, refetch, isSuccess, isFetching } = useQuery({
    queryKey: ["emailContinue"],
    queryFn: () => authApi.emailContinue(),
    enabled: false,
    retry: false,
    refetchOnWindowFocus: false,
    retryOnMount: false
  })

  useEffect(() => {
      
    if (isSuccess) {
      setAccessToken(data.accessToken as string)
      setSessionData(data.sessionData)
      navigate('/');
    }
    
  }, [isSuccess])

  return (
    <StyledContinue>
      <div >
        A link has been sent to your email.
      </div>
      <div >
        Click it to continue.
      </div>
      <button
        disabled={isFetching}
        onClick={() => refetch()}>
        Continue
      </button>
      <div>{}</div>
    </StyledContinue>
  )
}