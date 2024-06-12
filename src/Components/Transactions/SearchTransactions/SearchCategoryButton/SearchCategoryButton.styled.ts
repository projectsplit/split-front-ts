import styled from "styled-components";
import { StyledSearchCategoryButtonProps } from "../../../../interfaces";

export const StyledSearchCategoryButton = styled.div<StyledSearchCategoryButtonProps>`
  border: none;
  background-color: transparent;
  cursor: pointer;

  font-size: 20px;
  display: flex;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 15px;

  .type {
    color: ${({ theme }) => theme.colors.grey};
  }
`;
