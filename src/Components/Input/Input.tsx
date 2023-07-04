import React from 'react'
import { InputProps } from '../../interfaces'
import { StyledInput } from './StyledInput.styled'

export default function Input({ onChange, placeholder, value, className, type, step, spellCheck, autoFocus, error }: InputProps) {

  return (
    <StyledInput
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      className={className}
      type={type}
      step={step}
      spellCheck={spellCheck}
      autoFocus={autoFocus}
      error={error} />
  )
}
