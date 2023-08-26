import styled from "styled-components";
import { StyledOptionsButton } from "../../OptionsButton/OptionsButton.styles";
import {
  CalendarOptionsButtonProps,
  OptionsButtonProps,
} from "../../../interfaces";

export const StyledCalendarOptionsButton = styled(StyledOptionsButton)<
  OptionsButtonProps & CalendarOptionsButtonProps
>`
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.whiteText : props.theme.colors.layer2};
  color: ${(props) =>
    props.isActive ? props.theme.colors.body : props.theme.colors.whiteText};
`;
