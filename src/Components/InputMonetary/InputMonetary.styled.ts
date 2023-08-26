import styled from "styled-components";
import Input from "../Input/Input";
import { InputMonetaryProps } from "../../interfaces";

export const StyledInputMonetary = styled.div<InputMonetaryProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;

  .currencyOption {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    left: 14px;
  }
  .icon {
    font-size: 25px;
  }

  .currencySymbol {
    position: absolute;
    /* right: ${(props) => props.currencysymbolmargin}px;  */
    /* margin-right: ${(props) => props.currencysymbolmargin}px; */
    /* width: ${(props) => props.width}px; */
    /* margin-right:${(props) => props.width}px; */
    margin-right: ${(props) => props.currencysymbolmargin}px;
    right: 0px;
  }
`;

export const StyledInput = styled(Input)`
  text-align: right;
  background-color: ${({ theme }) => theme.colors.inputGrey};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
