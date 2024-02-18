import styled from "styled-components";


export const StyledNewButton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  background-color: ${({ theme }) => theme.colors.deepPurple};
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.8rem;
  padding-right: 0.8rem;
  border-radius: 8px;
  .plus{
    font-size:20px;
  }
`;
