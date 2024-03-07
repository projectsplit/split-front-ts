import React from 'react'
import { Outlet } from 'react-router-dom'
import { StyledMain } from './Main.styled'
import LogoAndUserOptionsStripe from './LogoAndUserOptionsStripe/LogoAndUserOptionsStripe'
import MainStripe from './MainStripe/MainStripe'

export default function Main() {

  return (
      <StyledMain>
        <LogoAndUserOptionsStripe />
        <MainStripe />
        <Outlet />
      </StyledMain>
  )
}
