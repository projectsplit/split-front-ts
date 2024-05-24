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

  p {
    margin: 0;
  }

  .header {
    padding: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

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
    padding: 14px;
    .lexicalSearch {
      position: relative;

      .contentEditable {
        padding: 0 1px;
        border: 1px solid #ccc;
      }
      .contentEditablePlaceholder {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 1px;
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
`;

// .searchBarAndCategories {
//   padding: 14px;
//   .searchInputs {
//     /* display: flex;
//     flex-direction: row; */
//     gap: 10px;
//     border: 2px solid white;
//     white-space: pre-wrap;
//     user-select: text;
//     overflow-wrap: break-word;
//     .inputWrap{

//     }
//     .inputSpace {
//       display: inline-block;
//       width: 20px; /* Adjust the width as needed */
//       pointer-events: none;
//     }
//   }
//   .searchOptions {
//     .paok {
//       padding: 10px;
//     }
//   }
// }
