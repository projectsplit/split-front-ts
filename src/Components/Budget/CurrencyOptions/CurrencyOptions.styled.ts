import styled from "styled-components";
import { StyledBottomMenu } from "../../../layouts/BottomMenu/BottomMenu.styled";



export const StyledCurrencyOptions = styled(StyledBottomMenu)`
  overflow: auto; /* or overflow: scroll; or overflow: hidden; */

  padding: 0;
  .header{
    padding: 15px;
    position: sticky;
    top: 0;
    z-index: 1; 
    background-color:${({theme})=>theme.colors.inputGrey};
   
  }
  .currencyOption {
    cursor: pointer;
    border-radius: 10px;
    padding: 5px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-left: 10px;
    align-items: center;
    
  }
  .currencyOption.clicked {
    background-color: #464689;
  }
`;
