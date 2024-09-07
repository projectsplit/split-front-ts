import styled from "styled-components";

export const StyledMemberPillsDisplay = styled.div`
  display: flex;
  flex-direction: row;
 
  width:100%;

  .category {
    cursor: pointer;
   
  }

  .pills {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto; 
    padding-bottom: 4px; 
   
  }

  .pills::-webkit-scrollbar {
    height:3px;
   
  }

  .pills::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.grey}; 
    border-radius: 4px;
    cursor: pointer;
  }

`;