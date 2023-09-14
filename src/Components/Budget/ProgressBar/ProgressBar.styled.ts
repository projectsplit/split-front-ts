import styled from "styled-components";

interface StyledProgressBarProps {
  percentage: number;
}

export const StyledProgressBar = styled.div<StyledProgressBarProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.inputGrey};
  border-color: ${({ theme }) => theme.colors.inputGrey};
  border-style: solid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 6px;
  padding: 0.8rem;

  .budgetTitle {
    display: flex;
    justify-content: center;
    .sup{
      margin-top: -3px;
    }
   
  }
  .miscInfo {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
  }
  .monetaryProgress {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
  .progressBar {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 5px;
    .wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
    }
    .targetIcon {
      color: ${({ theme }) => theme.colors.deepPurple};
      font-size: 40px;
      align-self: center;
      margin-top: -20px;
    }
    .amount {
      font-weight: bold;
    }
    .barWrapper {
      position: relative;
      width: 97%;
      background-color: black;
      border-radius: 20px;
      display: grid;
      height: 1rem;
      border-color: grey;
      .wrapper > * {
        grid-column: 1 / -1;
        grid-row: 1 / -1;
      }
      .bar {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        border-radius: inherit;
      }
      .bar:after {
        content: "";
        width: 100%;
        height: 100%;
        background-color: #0a7800;
        transform: translateX(
          calc(-100% + ${(props) => Math.min(props.percentage, 100)} * 1%)
        );
        transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
`;
