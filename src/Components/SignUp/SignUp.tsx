import React from 'react'
import { api } from '../../apis/api'
import { useQuery } from '@tanstack/react-query'
import { GetGroupRequest, GetGroupResponse } from '../../types';

export default function SignUp() {
  
  const request: GetGroupRequest = { id: '6400aa69233f84cc4adbeb4a' }

  const getGroupByIdQuery = useQuery<GetGroupResponse, any, any>({
    queryKey: ['group-6400aa69233f84cc4adbeb4a'],
    queryFn: () => api.getGroupById(request),
    onSuccess: (response: GetGroupResponse) => console.log(response.baseCurrency),
    onError: (error) => console.log("onError", error.message),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
    // enabled: false,
    // manual: true
  })

  return (<div>{JSON.stringify(getGroupByIdQuery)}</div>)
}
