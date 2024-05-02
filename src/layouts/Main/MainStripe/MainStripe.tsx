import React from 'react'

import GroupActionsBar from './GroupActionsBar/GroupActionsBar'
import { StyledMainStripe } from './MainStripe.styled'

export default function LogoAndUserOptionsStripe() {
  return (
    <StyledMainStripe>
      <GroupActionsBar/>
    </StyledMainStripe>
  )
}
