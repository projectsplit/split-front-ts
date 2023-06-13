import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

export default function PrivateRoutes() {
  const accessToken = 1
  return(
    accessToken ? <Outlet/> : <Navigate to='/signin'/>
  )
}
