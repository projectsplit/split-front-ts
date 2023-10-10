import styled from "styled-components";

export const StyledMiddleScreenMenu = styled.div`
  box-sizing: border-box;
  margin: 10px;
  position: fixed;
  top: 10%; 
  left: 50%;
  left: 0;
  right: 0; 
  background-color: ${({ theme }) => theme.colors.inputGrey};
  border-radius: 12px 12px 12px 12px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  gap: 14px;
  padding: 20px;
`;
