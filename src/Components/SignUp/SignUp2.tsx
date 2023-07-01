import React from 'react'
import { useGetGroupById } from '../../apis/queries';

export default function SignUp2() {

  const { isError, isSuccess, isLoading, data, error, fetchStatus } = useGetGroupById()

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error!</div>

  return (<div>
    {data?.title}
  </div>)
}
