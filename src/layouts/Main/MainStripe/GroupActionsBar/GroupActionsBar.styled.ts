import styled from "styled-components";

export const StyledGroupActionsBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  
  .groupName {
    margin-right: 25px;
    margin-left: 25px;
    font-size: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

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

  .addUserButton {
    cursor: pointer;
  }
  .mainContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 30px;
  }
  .addUserOptions {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;
  }
`;
