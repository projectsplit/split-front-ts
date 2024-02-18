import styled from "styled-components";

export const StyledTransactions = styled.div`


display:flex;
flex-direction: column;

scrollbar-width: thin;
/* scrollbar-gutter: stable both-edges; */
overflow: auto;

.transactionList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

`