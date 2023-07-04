import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getAccessToken } from '../util/accessToken'

export default function PrivateRoutes() {
  const accessToken = getAccessToken()
  
  return (
    accessToken ? <Outlet /> : <Navigate to='/access' />
  )
}
