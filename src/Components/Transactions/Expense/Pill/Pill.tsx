import React from 'react'
import { StyledPill } from './Pill.styled'
import { PillOptions } from '../../../../interfaces'

export default function Pill({ title, color }: PillOptions) {
  return (
    <StyledPill color={color}>{title}</StyledPill>
  )
}
