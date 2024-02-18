import styled from "styled-components";
import { StyledBottomMenu } from "../../../layouts/BottomMenu/BottomMenu.styled";
import { SubmitButtonProps } from "../../../interfaces";

export const StyledManageBudgetMenu = styled(StyledBottomMenu)`
  .header {
    text-align: left;
  }
`;

export const StyledManageBudgetOption = styled.button<SubmitButtonProps>`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  border: none;
  border-radius: 4px;
  user-select: none;
  padding: 0.5rem;
  cursor: pointer;
  background-color: #f0f0f0;
  font-size: 18px;

  .edit {
    .text {
      color: ${({ theme }) => theme.colors.text};
      margin-right: 25px;
    }
    .icon {
      width: 25px;
      height: 25px;
      color: ${({ theme }) => theme.colors.text};
    }
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  &:hover {
    opacity: 0.75;
    cursor: pointer;
    transition: 0.2s ease all;
  }
`;
