import styled from 'styled-components'

export const StyledDateTimePicker = styled.div`
  
  -webkit-tap-highlight-color: transparent;
  color: ${({ theme }) => theme.color.text1};
  background-color: ${({ theme }) => theme.color.background1};
  font-size: 18px;
  display: flex;
  flex-direction: column;
  border: 1px solid #222222;
  border-radius: 5px;
  align-self: flex-start;
  padding: 0.5em;
  gap: 0.5em;
  cursor: default;
  user-select: none;
  position: absolute;
  box-sizing: border-box;
  top: 100%;
  right: 0;
  margin-top: 4px;
  
  .top-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  
    .month-year {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 0.5em;
      
      .text {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        cursor: pointer;
        width: 2em;
        justify-content: center;
      }
  
      .button {
        font-size: 1.5em;
        color: #55555a;
        cursor: pointer;
      }
    }
  }
  
  .bottom-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    .time {
      cursor: pointer;
    }
    
    .timezone {
      color: #55555a
    }
    
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #55555a;
      padding: 0px 0.8em;
      height: 2em;
      border: 1px solid #34383C;
      border-radius: 5px;
      cursor: pointer;
      
      &.active{
        color: #e9ebf0;
        background-color: #257DE0;
      }
    }
  }
      
  .time-picker {
    background-color: #18181b;
    position: absolute;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5em;
    height: 10em;
    width: 100%;
    box-sizing: inherit;
    left: 0;
    right: 0;
    padding: 0.5em;
    bottom: 3em;
  }
`