import React from 'react'
import { StyledMainStripe } from './MainStripe.styled'
import { IoMdPersonAdd } from 'react-icons/io'
import { FaGear } from "react-icons/fa6";

export default function MainStripe() {
  return (
    <StyledMainStripe>
      <div className="groupName">
        Trip
      </div>
      <div className='options' >
        
        <FaGear className="optionsButton" />
      </div>

    </StyledMainStripe>
  )
}
