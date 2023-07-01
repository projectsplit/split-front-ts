import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router';
import { authApi } from '../../apis/authApi'
import { VerifyEmailLinkTokenRequest, VerifyEmailLinkTokenResponse } from "../../types"
import { useState, useEffect} from 'react';

let didInit = false;
export default function VerifyToken() {
  console.log(didInit)

  const { token } = useParams();
  const [type, setType] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [loading, setLoading] = useState(false)
  //const [isMutating, setIsMutating] = useState(false)


  const verifyTokenParam = useMutation<VerifyEmailLinkTokenResponse, any, VerifyEmailLinkTokenRequest>({
    mutationKey: ['verifyToken'],
    mutationFn: authApi.verifyEmailLinkToken,
    onSuccess: (res) => {
      setType(res.type)
      setLoading(false)
      console.log("mutate")
    },
    onError: (error) => {
      setErrorMessage(error.response.data)
    }
  });

  useEffect(() => {
    if (!didInit) {
      didInit = true;
      verifyTokenParam.mutate({
        token: token
      })
    }
  }, [])

  return (
    <div>
      {/* <button onClick={() => verify(token)}>komvio</button> */}
      {!loading && type === "sign-in" && !errorMessage &&
        < div >
          <div>You have successfully signed in.</div>
          <div>You can close this tab</div>

        </div>
      }
      {!loading && type === "sign-up" && !errorMessage &&
        < div >
          <div>Your account has been created</div>
          <div>You can close this tab</div>
        </div>
      }
      {!loading && errorMessage &&
        <div>
          {errorMessage}
        </div>}
    </div >
  )
}
