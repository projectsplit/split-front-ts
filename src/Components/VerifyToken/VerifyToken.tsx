import React, { useState } from 'react'
import { authApi } from '../../apis/authApi'
import { useQuery } from '@tanstack/react-query'
import { VerifyEmailLinkTokenRequest } from '../../types';
import { useParams } from 'react-router-dom';

export default function VerifyToken() {
  
  const { token } = useParams()
  
  const [text, setText] = useState<string>('loading')

  const verifyEmailLinkToken = useQuery<any, any, VerifyEmailLinkTokenRequest>({
    queryFn: () => authApi.verifyEmailLinkToken(
      { token: token as string }),
    onSuccess: () => setText('success'),
    onError: (error) => setText(error.message),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
    // enabled: false,
    // manual: true
  });

  return (
    <div>{text}</div>
  )
}
