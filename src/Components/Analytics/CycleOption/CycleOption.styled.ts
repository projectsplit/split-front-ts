import styled from "styled-components";

export const StyledCycleOption = styled.div`
  display: flex;
  flex-direction: column;
  .item {
    display: flex;
    justify-content: center;
    cursor: pointer;
    border-radius: 10px;
    padding: 14px;
    gap: 2px;
    &:hover {
      border-radius: 10px;
      background-color: ${({ theme }) => theme.colors.layer1};
    }
  }
  .item.clicked {
    background-color: ${({ theme }) => theme.colors.clicked};
    border-radius: 10px;
  }
`;
