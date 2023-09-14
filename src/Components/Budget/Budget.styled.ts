import styled from "styled-components";

export const StyledBudget = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightColor};
  background-color: ${({ theme }) => theme.colors.layer2};
  box-sizing: border-box;
  height: 100vh;
  width: 100%;
  padding: 14px;
  gap: 20px;
  position: relative;

  .backButtonContainer {
    position: relative;
    cursor: pointer;
    display: inline-block;
  }

  .backButton {
    cursor: pointer;
    display: block;
    font-size: 30px;
  }

  .backButtonContainer:hover::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(128, 128, 128, 0.3);
    pointer-events: none;
  }

  .topBar {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    justify-content: space-between;
    margin-right: 30px;
  }
  .descr {
    flex: 1;
    text-align: center;
  }

  .promptSpendingCap,
  .promptSpendingCycle {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .spentInfo {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.layer6};
  }
  .dummySpan {
    position: absolute;
    opacity: 0;
    z-index: -100;
    white-space: pre;
  }
  .categoryButtons {
    gap: 10px;
    display: flex;
    flex-direction: row;
  }

  .submitButton {
    margin-top: auto;
    display: flex;
    flex-direction: column;
  }

  .monthlyPropmt {
    display: flex;
    flex-direction: row;
    .sup {
      margin-top: -3px;
    }
  }
`;
