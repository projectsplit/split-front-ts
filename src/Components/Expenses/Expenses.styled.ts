import styled from 'styled-components'

export const StyledExpenses = styled.div`

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  
  .date {
    padding: 4px 0px;
    display: flex;
    flex-direction: row;
    position: sticky;
    top: 0px;
    font-size: ${({ theme }) => theme.font.small}; 
    font-weight: 700;
    border-radius: 0px;
    color: ${({ theme }) => theme.color.text2};
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.body};
    justify-content: center;
    align-items: center;
  }
  
  .expense-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .expense {
      
    }
  }
`
