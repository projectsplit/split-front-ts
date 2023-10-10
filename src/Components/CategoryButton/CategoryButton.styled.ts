import styled from "styled-components";

export const StyledCategoryButton = styled.div`
  .active {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.whiteText};
    color: ${({ theme }) => theme.colors.body};
    font-weight: bold;
    text-decoration: none;
  }
  .inactive {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    cursor: pointer;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.colors.layer2};
    color: ${({ theme }) => theme.colors.whiteText};
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.2s ease-in-out;
    &:hover {
      background-color: ${({ theme }) => theme.colors.layer1};
    }
  }
`;
