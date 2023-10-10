import React from 'react'
import { StyledSubmitButton } from './SubmitButton.styled'
import { SubmitButtonProps } from '../../interfaces'

export default function SubmitButton({ children, onClick}: SubmitButtonProps) {

  return (
    <StyledSubmitButton onClick={onClick} >
      {children}
    </StyledSubmitButton>
  )
}
