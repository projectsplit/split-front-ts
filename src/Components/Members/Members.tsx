import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../apis/api'
import { useSearchParams } from 'react-router-dom'

export default function Members() {

  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")

  const group = useQuery(
    ['getGroupById', id],
    () => (id ? api.getGroupById(id) : undefined),
    {
      enabled: !!id,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    }
  )

  return (
    <div>Members</div>
  )
}
