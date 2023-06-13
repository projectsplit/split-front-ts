import React from 'react'
import { useGetGroupById } from '../../api/queries';

export default function SignUp() {

  const { isError, isSuccess, isLoading, data, error, fetchStatus } = useGetGroupById()

  if (isLoading) return <div>Loading...</div>

  if (isError) return <div>Error!</div>

  return (<div>
    {data?.title}
  </div>)
}
