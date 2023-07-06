import styled from "styled-components";
import { OptionsContainerProps } from "../../interfaces";

export const StyledOptionsContainer = styled.div<OptionsContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 1rem 0.8rem;
  border-radius: 10px;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.layer2};
  border-color: ${({ theme }) => theme.colors.layer2};
  border-style: solid;
`;
