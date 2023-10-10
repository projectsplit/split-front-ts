import styled from "styled-components";
import { StyledAccessScreen } from "../AccessScreen/AccessScreen.styled";
import IonIcon from "@reacticons/ionicons";

export const StyledVerifyToken = styled(StyledAccessScreen)`
  .infoContainer {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.8rem;
    border-radius: 10px;
    gap: 14px;
    background-color: ${({ theme }) => theme.colors.layer1};
    border-color: ${({ theme }) => theme.colors.layer1};
    border-style: solid;
    align-items: center;
  }

  .message {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    width: 100%;
    overflow: hidden;
  }
`;

export const StyledCheckMark = styled(IonIcon)`
  color: ${({ theme }) => theme.colors.green};
  font-size: 32px;
`;

export const StyledErrorMark = styled(IonIcon)`
  color: ${({ theme }) => theme.colors.pink};
  font-size: 32px;
`;
