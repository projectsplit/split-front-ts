import styled from "styled-components";
import { StyledOptionsButton } from "../OptionsButton/OptionsButton.styles";

export const StyledUserOptionsButton = styled(StyledOptionsButton)`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  user-select: none;
  background-color: ${({ theme }) => theme.colors.labelColor6};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.whiteText};
  align-items: center;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;
