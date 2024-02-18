import React from 'react'
import { StyledWelcomeHeader } from './WelcomeHeader.styled'


export default function WelcomeHeader() {
  return (
    <StyledWelcomeHeader>
      <div className='logo'>
        α
      </div>
      <div className='appName'>
        αlphaSplit
        <div className='appDescription'>
          The tool for organising your finances.
        </div>
      </div>
    </StyledWelcomeHeader>
  )
}
