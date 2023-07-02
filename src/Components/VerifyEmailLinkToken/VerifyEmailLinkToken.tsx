import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { authApi } from '../../apis/authApi'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { EmailVerifyLinkResponse } from '../../types'

export default function EmailVerifyLinkToken() {

  const { token } = useParams()
  const [userCreated, setUserCreated] = useState<boolean>(false)

  const { isLoading, error, data, isSuccess } = useQuery<EmailVerifyLinkResponse, AxiosError<any>>(['verifyToken', token], () => {
    if (token) {
      return authApi.emailVerifyLinkToken(token)
    }
    throw new Error("No token provided")
  }, {
    retry: false,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (isSuccess) {
      setUserCreated(data.userCreated)
    }
  }, [isSuccess])

  return (
    <div>
      {isLoading && <div>Loading</div>}
      {error &&
        <div>
          {error.response?.data}
        </div>
      }
      {!isLoading && !error && !userCreated &&
        <div>
          <div>You have successfully signed in.</div>
          <div>You can close this tab</div>
        </div>
      }
      {!isLoading && !error && userCreated &&
        <div>
          <div>Your account has been created</div>
          <div>You can close this tab</div>
        </div>
      }
    </div >
  )
}