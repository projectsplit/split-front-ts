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
        /* p {
          margin: 0; 
          white-space: nowrap;
          overflow: hidden;o
        }
        span {
          white-space: nowrap; 
          overflow: hidden;
        } */
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
        top: 3.6%;
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
