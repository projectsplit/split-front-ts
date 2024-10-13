import React from 'react'
import { StyledSubmitButton } from './SubmitButton.styled'
import { SubmitButtonProps } from '../../interfaces'

export default function SubmitButton({ children, onClick,submitButtonIsActive}: SubmitButtonProps) {

  return (
    <StyledSubmitButton onClick={onClick} submitButtonIsActive={submitButtonIsActive}  disabled={submitButtonIsActive?.value === false}>
      {children}
    </StyledSubmitButton>
  )
}
