import styled from "styled-components";

export const StyledTransactions = styled.div`
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  /* scrollbar-gutter: stable both-edges; */
  overflow: auto;

  .transactionField {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .transactionList {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .monthYearSticky {
    display: flex;
    justify-content: center;
    position: sticky;
    top: 0px; /* Stick to the top of the container */
    background-color: ${({ theme }) => theme.colors.body};
    z-index: 1; /* Ensure it's above other elements */
    padding: 5px;
    transition: all 0.5s ease; /* Add a nice transition effect */
  }

  .monthYear{

  }
`;
