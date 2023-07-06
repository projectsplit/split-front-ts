import styled from "styled-components";

export const StyledRecommendation = styled.div`
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
        font-size: 40px;
        color: #ff7878;
      }
    }

    .closeButton {
      position: absolute;
      top: -0.8rem;
      right: -0.8rem;
      cursor: pointer;
      font-size: 30px;
      color: #6f6f6f;
    }
  }
`;
