import styled from "styled-components";


export const StyledSearchCategoryButton = styled.div`
  border: none;
  background-color: transparent;

  font-size: 20px;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 15px;

  .category{
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
