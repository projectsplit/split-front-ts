import React from "react";
import { StyledOptionsContainer } from "./OptionsContainer.styled";
import { OptionsContainerProps } from "../../interfaces";
import IonIcon from "@reacticons/ionicons";

export default function OptionsContainer({
  children,
  onClick,
 hasarrow,

}: OptionsContainerProps) {
  return (
    <StyledOptionsContainer onClick={onClick} hasarrow={hasarrow.toString()} >
      {children}
      {hasarrow && <IonIcon name="chevron-forward-outline" className="arrow" />}
    </StyledOptionsContainer>
  );
}
