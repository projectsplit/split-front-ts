import React from "react";
import { StyledOptionsButton } from "./OptionsButton.styles";
import { OptionsButtonProps } from "../../interfaces";

export default function OptionsButton({
  onClick,
  children,
}: OptionsButtonProps) {
  return (
    <StyledOptionsButton onClick={onClick}>{children}</StyledOptionsButton>
  );
}
