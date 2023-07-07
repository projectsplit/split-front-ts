import styled from "styled-components";
import { OptionsContainerProps } from "../../../interfaces";

export const StyledMostRecentContainer = styled.div<OptionsContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 5px 0.8rem 0px;
  border-bottom-width: 0px;
  border-top-width: 5px;
  border-radius: 10px;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.layer2};
  border-color: ${({ theme }) => theme.colors.layer2};
  border-style: solid;
  cursor: pointer;
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0rem;
    font-size:30px;
  }
`;
