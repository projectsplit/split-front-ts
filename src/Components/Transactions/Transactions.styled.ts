import styled from "styled-components";

export const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  overflow: auto;

  .transactionField {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .magnifyingGlass {
      position: absolute;
      top: 67px;
      right: 14px;
      z-index: 2;
      font-size: 28px;
      color: ${({ theme }) => theme.colors.grey};
      cursor: pointer;
    }
  }

  .transactionList {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px;
  }

  .monthYearSticky {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0px;
    background-color: ${({ theme }) => theme.colors.body};
    z-index: 1;
    padding: 14px;
    transition: all 0.5s ease;
  }

  .monthYear {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.grey};
  }
`;
