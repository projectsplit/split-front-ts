import styled from 'styled-components'
import { SubmitButtonProps } from '../../interfaces'
export const StyledSubmitButton = styled.button<SubmitButtonProps>`

  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  border: none;
  border-radius: 4px;
  user-select: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  position: relative;  
  font-size: 18px;
 

  &:hover {
    opacity: 0.75;
    cursor:pointer;
    transition: 0.2s ease all;
  }
`