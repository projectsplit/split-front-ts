import styled from 'styled-components'

export const StyledExpenseListItem = styled.div`

  display: flex;
  flex-direction: column;
  color: white;
  border-radius: 10px;
  background: #18181B;
  padding: 10px;
  gap: 4px;
  cursor: pointer;
  
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 14px;
    
    .left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      color: #777777;
    
      .time {
        font-weight: 900;
      }
    
      .icons {
        display: flex;
        flex-direction: row;
        gap: 8px;
    
        .location {
          display: flex;
          align-items: center;
        }
    
        .comments {
          display: flex;
          align-items: center;
          font-weight: 900;
          gap: 1px;
        }
      }
    }
    
    .right {
    }
  }
  
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 20px;
    
    .left {
      .description {
        font-style: italic;
        color: ${({ theme }) => theme.colors.whiteText}
      }
    }
    
    .right {
      display: flex;
      flex-direction: row;
      gap: 8px;
      color: #777777;
      font-weight: bold;
      
      .amount {
      }
      
      .currency {
      }
    }
  }
`
