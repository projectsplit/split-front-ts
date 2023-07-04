import styled from "styled-components";
import { StyledAccessScreen } from "../AccessScreen/AccessScreen.styled";

export const StyledContinue = styled(StyledAccessScreen)`
  .infoContainer {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.8rem;
    border-radius: 10px;
    gap: 14px;
    background-color: ${({ theme }) => theme.colors.layer1};
    border-color: ${({ theme }) => theme.colors.layer1};
    border-style: solid;
  }

  .infoMessage {
    white-space: initial;
    text-align: center;
  }
`;
