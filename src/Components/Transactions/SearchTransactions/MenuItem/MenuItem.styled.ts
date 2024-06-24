import styled from "styled-components";
import { StyledMenuItemProps } from "../../../../interfaces";

export const StyledMenuItem = styled.li<StyledMenuItemProps>`
  display: flex;
  cursor: pointer;
  user-select: none;
  align-items: center;
  border-radius: 0.375rem;
  padding: 0.375rem 0.5rem;
  font-size: 20px;
  margin-bottom:5px;

  /* background-color: ${({ selected }) => (selected ? "blue" : "transparent")}; */
`;
