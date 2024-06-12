import styled from "styled-components";

export const StyledOptionsToolbar = styled.div`
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
