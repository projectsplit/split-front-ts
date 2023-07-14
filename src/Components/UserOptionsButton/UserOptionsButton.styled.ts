import styled from "styled-components";
import { UserOptionsButtonProps } from "../../interfaces";

export const StyledUserOptionsButton = styled.div<UserOptionsButtonProps>`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  border-radius: 8px;
  user-select: none;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.labelColor6};
  font-size: 16px;
  color: rgb(248, 248, 248);
  font-weight: bold;
  display: flex;
  position: relative;
  align-items: center;
  max-width: 80px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
`;
