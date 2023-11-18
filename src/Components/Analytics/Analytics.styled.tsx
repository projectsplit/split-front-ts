import { styled } from "styled-components";

export const StyledAnalytics = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightColor};
  /* background-color: ${({ theme }) => theme.colors.layer2}; */
  box-sizing: border-box;
  min-height: 100vh;
  width: 100%;
  padding: 14px;
  gap: 20px;
  position: relative;`;
