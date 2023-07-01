import React from 'react'
import { api } from '../../apis/api'
import { useQuery } from '@tanstack/react-query'
import { GetGroupRequest, GetGroupResponse } from '../../types';

export default function SignUp() {
  
  const request: GetGroupRequest = { id: '6400aa69233f84cc4adbeb4a' }

  const getGroupByIdQuery = useQuery({
    queryKey: ['group-6400aa69233f84cc4adbeb4a'],
    queryFn: () => api.getGroupById(request),
    onSuccess: (response) => console.log(response.baseCurrency),
    onError: (error) => console.log("onError", error),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false
    // enabled: false,
    // manual: true
  })

  return <div><pre>{JSON.stringify(getGroupByIdQuery, null, 2)}</pre></div>
}
