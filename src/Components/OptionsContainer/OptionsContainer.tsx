import React from "react";
import { StyledOptionsContainer } from "./OptionsContainer.styled";
import { OptionsContainerProps } from "../../interfaces";
import IonIcon from "@reacticons/ionicons";

export default function OptionsContainer({
  children,
  onClick,
  hasArrow
}: OptionsContainerProps) {
  return (
    <StyledOptionsContainer onClick={onClick} hasArrow={hasArrow}>
      {children}
      {hasArrow && <IonIcon name="chevron-forward-outline" className="arrow" />}
    </StyledOptionsContainer>
  );
}
