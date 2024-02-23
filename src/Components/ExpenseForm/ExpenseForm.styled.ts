import styled from 'styled-components'

export const StyledExpenseForm = styled.div`

  background-color: ${({ theme }) => theme.color.background1};
  color: ${({ theme }) => theme.color.text1};
  font-size: ${({ theme }) => theme.font.small};
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;

  .input {
    background-color: ${({ theme }) => theme.color.background2};
    color: ${({ theme }) => theme.color.text1};
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: ${({ theme }) => theme.color.border1};
    font-size: 20px;
    outline: none;
    padding: 8px 14px
  }
  
  .message {
    padding: 0px 4px;
    font-size: 12px;
    color: ${({ theme }) => theme.color.text2};
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
    
    input {
      background-color: #18181b;
      border-radius: 10px;
      border-style: solid;
      border-width: 1px;
      font-size: 20px;
      outline: none;
      color: #cecece;
      padding: 6px 10px;
      box-sizing: border-box;
      width: 100%;
      appearance: none;
    }
  }
  
  .time-section {
    display: flex;
    flex-direction: column;
  }
`