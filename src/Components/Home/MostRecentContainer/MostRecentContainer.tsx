import React from "react";
import { StyledMostRecentContainer } from "./MostRecentContainer.styled";
import { OptionsContainerProps } from "../../../interfaces";

export default function MostRecentContainer({
  children,
  onClick,
}: OptionsContainerProps) {
  return <StyledMostRecentContainer onClick={onClick}>
    {children}
  </StyledMostRecentContainer>;
}
