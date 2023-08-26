import React from "react";
import { StyledCalendarOptionsButton } from "./CalendarOptionsButton.styled";
import {
  CalendarOptionsButtonProps,
  OptionsButtonProps,
} from "../../../interfaces";

export default function CalendarOptionsButton({
  children,
  onClick,
  isActive,
}: OptionsButtonProps & CalendarOptionsButtonProps) {
  return (
    <StyledCalendarOptionsButton onClick={onClick} isActive={isActive}>
      {children}
    </StyledCalendarOptionsButton>
  );
}
