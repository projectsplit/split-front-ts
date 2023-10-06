import React from "react";
import { StyledMiddleScreenMenu } from "./MiddleScreenMenu.styled";
import { MiddleScreenMenuProps } from "../../interfaces";

export default function MiddleScreenMenu({ children }: MiddleScreenMenuProps) {
  return <StyledMiddleScreenMenu>{children}</StyledMiddleScreenMenu>;
}
