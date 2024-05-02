import styled from "styled-components";
import Input from "../../../Input/Input";

export const StyledSearchBar = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: space-evenly;
  border-style: none;
  border-width: 0;
  border-color: transparent;
  border-radius: 4px;
 
 
`;

export const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.colors.searchBarGrey};
  
`;
