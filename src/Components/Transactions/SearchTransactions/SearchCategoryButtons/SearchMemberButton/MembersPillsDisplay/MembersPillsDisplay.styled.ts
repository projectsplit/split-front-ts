import styled from "styled-components";

export const StyledMemberPillsDisplay = styled.div`
  display: flex;
  flex-direction: row;
  .category {
    cursor: pointer;
  }

  .type {
    color: ${({ theme }) => theme.colors.grey};
  }

  .pills {
    display: flex;
    flex-direction: row;
  }
`;
