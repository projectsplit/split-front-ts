import styled from "styled-components";

export const StyledSearchTransactions = styled.div`
  box-sizing: border-box;
  bottom: 0;
  position: fixed;
  background-color: ${({ theme }) => theme.colors.layer2};
  width: 100vw;
  height: 100vh;
  z-index: 3;
  padding: 0;
  display: flex;
  flex-direction: column;


  p {
    margin: 0;
  }

  .header {
    padding: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    .closeSign {
      display: flex;
      align-self: center;
      font-size: 30px;
      margin-right: 15px;
      cursor: pointer;
    }

    .groupName {
      font-weight: 600;
    }
    .gap {
      margin-right: 15px;
    }
    .searchingIn {
      font-size: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .searchBarAndCategories {
    flex: 1;
    padding: 14px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
 

    .lexicalSearch {
      position: relative;
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;

      .contentEditable {
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 0.5rem;
        color: white;
        background-color: ${({ theme }) => theme.colors.inputGrey};
        border-style: none;
        font-size: 18px;
        outline: none;
        min-height: 20px;
  
      }
      .contentEditablePlaceholder {
        position: absolute;
        top: 1.2%;
        left: 0.5%;
        padding: 0 1px;
        color: ${({ theme }) => theme.colors.grey};
      }
      .editor-bold {
        color: yellow;
      }
      .trigger {
        color: white;
      }
      .value {
      }
      .container {
        background-color: blue;
      }
      .containerFocused {
        background-color: blue;
      }
    }
  }

  .submitButton {
    z-index: 4;
    display: flex;
    flex-direction: column;
    position: sticky;
    bottom: 14px;
    width: calc(100% - 28px); 
    left: 14px;
    background-color: ${({ theme }) => theme.colors.layer2};
  }
`;
