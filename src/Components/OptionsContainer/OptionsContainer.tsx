import React from "react";
import { StyledOptionsContainer } from "./OptionsContainer.styled";
import { OptionsContainerProps } from "../../interfaces";

export default function OptionsContainer({
  children,
  onClick,
}: OptionsContainerProps) {
  return (
    <StyledOptionsContainer onClick={onClick}>
      {children}
    </StyledOptionsContainer>
  );
}
