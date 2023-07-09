import styled from 'styled-components'

export const StyledExpenseDetails = styled.div`

  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.whiteText};
  border-radius: 10px;
  /* border-color: #333333; */
  /* border-style: solid; */
  border-width: 1px;
  background-color: #18181B;
  padding: 10px;
  gap: 10px;
  
  .top-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    
    .time {
      font-weight: 900;
      color: #777777;
    }
    
    .labels {
    }
  }
  
  .description {
    font-style: italic;
    align-self: center;
    color: ${({ theme }) => theme.colors.whiteText};
    font-size: 20px
  }
  
  .amount {
    font-style: italic;
    align-self: center;
    color: ${({ theme }) => theme.colors.whiteText};
    font-size: 24px
  }
  
  .participants {
  }
  
  .payers {
  }
  
  .location {
    border-style: solid;
    border-radius: 4px;
    border-width: 1px;
    border-color: #333333
  }
  
  .actions {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 10px;
    
    .edit {
      color: #BEC28F;
      border-style: solid;
      border-radius: 10px;
      border-width: 1px;
      font-size: 20px;
      font-weight: 500;
      padding: 2px 14px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
    
    .delete {
      color: #FF6767;
      border-style: solid;
      border-radius: 10px;
      border-width: 1px;
      font-size: 20px;
      font-weight: 500;
      padding: 2px 14px;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }
  }
  
  .subtitle {
    font-style: italic;
    color: #777777;
    font-size: 12px
  }
  
  .comments {
    
  }
`
