import styled from 'styled-components'

export const StyledDayPicker = styled.div`
  
  display: flex;
  flex-direction: column;
  cursor: default;
  user-select: none;
  
  .names-row {
    display: flex;
    flex-direction: row;
    width: max-content;
    gap: 0.2em;
      
    .day-name {
      color: #88888b;
      display: flex;
      flex-direction: row;
      gap: 0.2em;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: 2em;
      height: 2em;
    }
  }
  
  .month-grid {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    
    .week-row {
      display: flex;
      flex-direction: row;
      gap: 0.2em;
        
      .inactive {
        color: #555558;
      }
      
      .day {
        display: flex;
        flex-direction: row;
        flex-shrink: 0;
        justify-content: center;
        align-items: center;
        width: 2em;
        height: 2em;
        border-radius: 5px;
        cursor: pointer;
        
        @media (hover: hover) {
          &:hover {
           background-color: #34383C;
          }
        }
      }
      
      .selected {
        background-color: #257DE0;
        
        &:hover {
          background-color: #257DE0;
        }
      }
        
      .today {
        border: 1px solid #34383C;
        box-sizing: border-box;
      }
    }
  }
  
`