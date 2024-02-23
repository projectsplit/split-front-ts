import React from 'react'
import { StyledColoredLabel } from './ColoredLabel.styled'
import { Label } from '../../types'
import tinycolor from 'tinycolor2'

interface ColoredLabelProps {
  label: Label;
}

export default function ColoredLabel({ label }: ColoredLabelProps) {

  return (
    <StyledColoredLabel style={{color: label.color, backgroundColor: tinycolor(label.color).setAlpha(0.08).toRgbString()}}>
      {label.text}
    </StyledColoredLabel>
  )
}
