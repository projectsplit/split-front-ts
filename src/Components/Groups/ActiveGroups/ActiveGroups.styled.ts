import styled from "styled-components";

export const StyledActiveGroups = styled.div`
    display: flex;
    flex-direction: column;
    scrollbar-width: thin;
    overflow:auto;
    padding: 14px;

  .groups{
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* margin-top: 0px; */
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
