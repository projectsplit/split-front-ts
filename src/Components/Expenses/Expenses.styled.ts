import styled from 'styled-components'

export const StyledExpenses = styled.div`

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  
  .date {
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0px;
    font-size: 14px;
    font-weight: 900;
    color: #777777;
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.body};
    justify-content: center;
    align-items: center;
  }
`
