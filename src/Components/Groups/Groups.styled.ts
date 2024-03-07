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
    margin-bottom: 10px;
    position: relative;
  }
  
  .separator::after {
    content: '';
    position: fixed;
    left: 0;
    right: 0;
    z-index: 1;
    height: 1px; /* Adjust thickness as needed */
    background-color: rgb(54,54,54); /* Your pale line color */
    
  }
`;
