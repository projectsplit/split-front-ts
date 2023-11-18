import { styled } from "styled-components";

export const StyledTopBarWithBackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  justify-content: space-between;
  margin-right: 30px;

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
  .descr {
    flex: 1;
    text-align: center;
  }
`;
