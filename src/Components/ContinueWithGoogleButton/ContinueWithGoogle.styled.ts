import styled from "styled-components";
import { StyledSubmitButton } from "../SubmitButton/SubmitButton.styled";

export const StyledContinueWithGoogleButton = styled(StyledSubmitButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;

  .googleLogo {
    font-size: 20px;
    font-weight: bold;
  }

  .prompt {
    text-align: center;
  }
`;
