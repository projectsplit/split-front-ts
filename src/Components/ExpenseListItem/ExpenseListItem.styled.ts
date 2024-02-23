import styled from 'styled-components'

export const StyledExpenseListItem = styled.div`

  display: flex;
  flex-direction: column;
  color: white;
  background-color: ${({ theme }) => theme.color.background2};
  padding: 10px;
  gap: 10px;
  cursor: pointer;
  
  .top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${({ theme }) => theme.color.text2};
    font-size: ${({ theme }) => theme.font.small};
    
    .left {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
    
      .time {
        font-weight: 700;
      }
    }
    
    .right {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    
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
          gap: 1px;
        }
      }
    }
  }
  
  .middle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .left {
      .description {
        font-style: italic;
      }
    }
    
    .right {
      display: flex;
      flex-direction: row;
      gap: 8px;
      
      .amount {
      }
      
      .currency {
      }
    }
  }
  
  .bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .left {
    }
    
    .right {
      display: flex;
      flex-direction: row;
      gap: 8px;
      
      .amount {
        color: ${({ theme }) => theme.color.text2}
      }
      
      .currency {
      }
    }
  }
`
