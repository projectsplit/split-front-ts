import styled from "styled-components";

export const StyledActiveGroups = styled.div`
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
    overflow:auto;
    
  .groups{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .groupsInfo {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.layer6};
    .owe {
      color: ${({ theme }) => theme.colors.redish};
    }
    .owed {
      color: ${({ theme }) => theme.colors.green};
    }
  }
`;
