import styled from "styled-components";
import Input from "../Input/Input";

interface StyledInputMonetary {
  inputError?: boolean;
}
export const StyledInputMonetary = styled.div<StyledInputMonetary>`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
  border-style: ${({ inputError }) => (inputError ? "solid" : "none")};
  border-width: ${({ inputError }) => (inputError ? "1px" : "0")};
  border-color: ${({ theme, inputError }) =>
    inputError ? theme.colors.pink : "transparent"};
  background-color: ${({ theme }) => theme.colors.layer2};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;

  .currencyOption {
    position: absolute;
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    left: 14px;
    cursor: pointer;
  }
  .icon {
    font-size: 25px;
  }

  .currencySymbol {
    position: absolute;
    right: 0px;
  }
`;

export const StyledInput = styled(Input)`
  text-align: right;
  margin-left: 70px;
`;
