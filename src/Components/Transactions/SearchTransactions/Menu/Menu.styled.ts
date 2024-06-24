import styled from "styled-components";
import { CombinedMenuProps } from "../../../../interfaces";

export const StyledMenu = styled.div<CombinedMenuProps>`
  overflow: hidden;
  background-color: transparent;
  cursor: pointer;
  scrollbar-width: none;
  position: fixed; 
  top: ${({ contentEditableHeight }) => `${116 + (contentEditableHeight - 37)}px`};
  left:6px;
  z-index: 1000; 
  border: none;
`;

