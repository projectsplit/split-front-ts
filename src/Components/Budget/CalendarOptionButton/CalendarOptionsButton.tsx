import React from "react";
import { StyledCalendarOptionsButton } from "./CalendarOptionsButton.styled";
import {
  CalendarOptionsButtonProps,
  OptionsButtonProps,
} from "../../../interfaces";

export default function CalendarOptionsButton({
  children,
  onClick,
  isactive,
}: OptionsButtonProps & CalendarOptionsButtonProps) {
  return (
    <StyledCalendarOptionsButton onClick={onClick} isactive={isactive}>
      {children}
    </StyledCalendarOptionsButton>
  );
}
