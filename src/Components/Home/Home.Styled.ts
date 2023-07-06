import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const StyledHomepage = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightColor};
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 14px;

  .welcomeStripe {
    font-size: 15px;
    padding: 2.5rem 0 2.5rem 0;
    white-space: initial;
  }

  .optionsStripe {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .header {
      display: flex;
      justify-content: center;
      font-weight: bold;
    }
    .signParagraphWrap {
      display: flex;
      flex-direction: row;
      align-items: center;
      .sign {
        margin-right: 10px;
      }
      .paragraphs {
        font-size: 13px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .warning {
        font-size: 35px;
        color: #ff7878;
      }
    }
  }

  .recommendation {
    position: relative;
    padding: 1rem 0.8rem;
    border-radius: 10px;
    gap: 14px;
    background-color: ${({ theme }) => theme.colors.layer1};
    border-color: ${({ theme }) => theme.colors.layer1};
    border-style: solid;
    font-weight: bold;
  }


  .closeButton {
    position: absolute; /* Add this line to make the button absolute */
    top: 0.5rem; /* Adjust the top and right values as needed */
    right: 0.5rem;
    cursor: pointer;
    font-size: 30px;
    color: #6F6F6F;
  }


  .mostRecent {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .mostRecentMsg {
      font-size: 12px;
      margin-left: 5px;
    }
  }
`;
