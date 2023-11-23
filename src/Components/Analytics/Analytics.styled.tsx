import { styled } from "styled-components";

export const StyledAnalytics = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightColor};
  box-sizing: border-box;
  /* background-color: ${({ theme }) => theme.colors.layer2}; */
  min-height: 100vh;
  width: 100%;
  padding: 14px;
  gap: 20px;
  position: relative;

  .buttons {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .groupCategories {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 4px;
  }

  .buttonChart {
    font-size: 40px;
    color: ${({ theme }) => theme.colors.deepPurple};
  }
  .dashed {
    width: 40px;
    fill: ${({ theme }) => theme.colors.deepPurple};
  }

  .charts {
    .chartWrapper {
      display: flex;
      flex-direction: column;
      .chart {
        width: 600px;
        align-self: center;
      }
    }
  }
  .period {
    display: flex;
    justify-content: center;
    color:#DDDDDD;
    font-weight: bold;
    font-size: 1.8em;
  }
`;
