import React from 'react'
import { signOut } from '../../util/signOut'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../apis/api'
import { useSearchParams } from 'react-router-dom';

export default function Home() {
  
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const group = useQuery(['getGroupById', id], () => (id ? api.getGroupById(id) : undefined), {
    enabled: !!id,
    retryOnMount: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return (
    <div>
      Home
      <button onClick={signOut}>sign out</button>
    </div>
  )
}