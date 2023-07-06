import React from "react";
import { UserOptionsButtonProps } from "../../interfaces";
import { StyledUserOptionsButton } from "./UserOptionsButton.styled";

export default function UserOptionsButton({
  onClick,
  children,
}: UserOptionsButtonProps) {
  return (
    <StyledUserOptionsButton onClick={onClick}>
      {children}
    </StyledUserOptionsButton>
  );
}
