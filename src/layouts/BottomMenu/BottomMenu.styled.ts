import styled from "styled-components";

interface StyledBottomMenuProps {
  height?: string;
}
export const StyledBottomMenu = styled.div<StyledBottomMenuProps>`
  box-sizing: border-box;
  margin: 0px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.inputGrey};
  border-radius: 12px 12px 0px 0px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  gap: 14px;
  padding: 14px;
  height:${props=>props.height} ;
`;
