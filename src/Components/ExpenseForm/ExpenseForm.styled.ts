import styled from 'styled-components'

export const StyledExpenseForm = styled.div`

  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  background-color: #18181b;
  border-radius: 10px;

  .input {
    background-color: #18181b;
    border-radius: 10px;
    border-style: solid;
    border-width: 1px;
    border-color: #333333;
    font-size: 20px;
    outline: none;
    color: #cecece;
    padding: 8px 14px
  }

  .message {
    padding: 0px 4px;
    font-size: 12px;
    color: #777777;
    font-style: italic;
  }
  
  .amount-section {
    display: flex;
    flex-direction: column;

    .input {
      text-align: right;
    }

  }
  
  .description-section {
    display: flex;
    flex-direction: column;
  }
  
  .participants-section {
    
  }
  
  .payers-section {
    
  }
  
  .location-section {
    
  }
`
