import styled from "styled-components";

export const StyledGroups = styled.div`
  padding: 14px;
  overflow: auto;
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.body};

  .groupCategories {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 4px;
    margin-top: 10px;
    box-shadow: 0px 5px 5px -3px ${({ theme }) => theme.colors.body};
    z-index: 1;
    padding-bottom: 10px;
  }
`;
