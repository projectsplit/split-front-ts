import React from 'react'
import { StyledColoredLabel } from './ColoredLabel.styled'
import { Label } from '../../types'

interface ColoredLabelProps {
  label: Label;
}

export default function ColoredLabel({ label }: ColoredLabelProps) {

  return (
    <StyledColoredLabel color={label.color}>
      {label.text}
    </StyledColoredLabel>
  )
}
