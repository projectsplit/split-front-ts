import React from 'react'
import { StyledLogoAndUserOptionsStripe } from './LogoAndUserOptionsStripe.styled'
import UserOptionsButton from '../../../components/UserOptionsButton/UserOptionsButton'

export default function LogoAndUserOptionsStripe() {
  return (
    <StyledLogoAndUserOptionsStripe>
      <div className="logo">α</div>
      <div className="QRandUserOptions">
        <UserOptionsButton>{"sessionData.userNickname"}</UserOptionsButton>
      </div>
    </StyledLogoAndUserOptionsStripe>
  )
}
