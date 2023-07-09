import styled from 'styled-components'

export const StyledExpenseDetailsParticipants = styled.div`

  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.whiteText};
  background-color: #18181B;
  padding: 10px;
  gap: 10px;
  border-style: solid;
  border-radius: 10px;
  border-width: 1px;
  border-color: #333333;
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  
  .header {
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    .text {
      
    }
    
    .button {
      
      font-size: 12px;
      color: #777777;
      text-decoration: underline;
      font-style: italic;
    }
  }
  
  .details {
    
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    .name {
      
    }
    
    .amount {
      
    }
    
    .percentage {
      
    }
  }
`
