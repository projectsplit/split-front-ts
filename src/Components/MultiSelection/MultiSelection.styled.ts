import styled from 'styled-components'

export const StyledMultiSelection = styled.div`
  
  display: flex;
  flex-direction: column;
  color: #DDDDDD;
  cursor: pointer;
  user-select: none;
  font-size: 20px;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  
  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border-width: 1px;
    border-color: #333333;
    border-style: solid;
    padding: 6px 14px;
    color: #757575;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    
    .icon {
      &:hover {
        color: #DDDDDD;
      }
    }
  }
  
  .dropdown {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 100%;
    background-color: #0E0E10;
    box-sizing: border-box;
    border-radius: 6px;
    border-width: 1px;
    border-color: #333338;
    border-style: solid;
    height: 450px;
    overflow: auto;
    top: 100%; // starts from the very bottom of the parent
    margin-top: 4px; // adds 4px below the parent's bottom
    /* max-height: 30vh; */
    padding: 6px 0px;
      
    .selected {
      background-color: #18181B;
      color: #FFFFFF;
    }
    
    .available {
      justify-self: end;
      color: #777777;
      &:hover {
        background-color: #121215;
      }
    }
    
    .option {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;
      
      .right {
        display: flex;
        flex-direction: row;
        justify-items: end;
        align-items: center;
        gap: 10px;
        
        .currency {
          color: #777777;
        }
        
        .amount {
          background-color: #18181B;
          color: #777777;
          border-style: none;
          border-width: 1px;
          border-radius: 4px;
          border-color: transparent;
          text-align: right;
          padding: 0px 10px;
          width: 100px;
          outline: solid;
          outline-width: 1px;
          outline-color: transparent;
          font-size: 20px;
          font-style: italic;
          
          &:focus {
            outline-color: #222222;
          }
          &:focus:hover {
            outline-color: #333333;
          }
          &:hover {
            outline-color: #222222;
          }
        }
        
        .locked-icon{
          color: #DDDDDD;
        }
        
        .unlocked-icon{
          color: #333333;
        }
      }
    }
  }
  
`