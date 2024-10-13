import styled from 'styled-components'
import { SubmitButtonProps } from '../../interfaces'

export const StyledSubmitButton = styled.button<SubmitButtonProps>`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  border: none;
  border-radius: 4px;
  user-select: none;
  padding: 0.5rem;
  cursor: ${({ submitButtonIsActive }) =>
    submitButtonIsActive?.value === false ? 'not-allowed' : 'pointer'};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme, submitButtonIsActive }) =>
    submitButtonIsActive?.value !== false
      ? theme.colors.buttonActive
      : theme.colors.buttonNotActive};
  display: flex;
  justify-content: center;
  position: relative;  
  font-size: 18px;

  &:hover {
    opacity: ${({ submitButtonIsActive }) => (submitButtonIsActive?.value === false ? 1 : 0.75)};
  }

  &:disabled {
    cursor: not-allowed;  // Override the default cursor when disabled
    opacity: 1;  // Keep the same opacity to ensure no hover effect
  }
`;
