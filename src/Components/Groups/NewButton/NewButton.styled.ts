import styled from "styled-components";
import { NewButtonProps } from "../../../interfaces";

export const StyledNewButton = styled.div<NewButtonProps>`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.deepPurple};
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 8px;
  .plus{
    font-size:25px;
  }
`;
