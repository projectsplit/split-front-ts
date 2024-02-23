import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const StyledLabelSelect = styled.div`
  
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
    border-radius: 5px;
    border-width: 1px;
    border-color: ${({ theme }) => theme.color.border1};
    border-style: solid;
    padding: 7px 14px;
    color: #757575;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    
    .left {
      display: flex;
      flex: 1 1 0%;
      flex-wrap: wrap;
      gap: 6px;
      
      .selected-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 6px;
        padding: 0px 8px;
        border-radius: 3px;
        box-sizing: border-box;
        
        .label-text {
        }
          
        .x-icon {
          font-size: 14px;
        }
      }
    }
    
    .icon {
      &:hover {
        color: #DDDDDD;
      }
    }
  }
  
  .dropdown {
    border-color: ${({ theme }) => theme.color.border1};
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 6;
    width: 100%;
    background-color: ${({ theme }) => theme.color.background2};
    box-sizing: border-box;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    max-height: 450px;
    overflow: auto;
    top: 100%; // starts from the very bottom of the parent
    margin-top: 4px; // adds 4px below the parent's bottom
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
      animation: ${fadeIn} 0.3s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;
    }
  }
  
`