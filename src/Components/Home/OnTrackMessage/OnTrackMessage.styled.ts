import styled from "styled-components";

export const StyledOnTrackMessage = styled.div`
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    .signParagraphWrap {
      display: flex;
      flex-direction: row;
      /* align-items: center; */
      .sign {
        margin-right: 10px;
      }
      .paragraphs {
        font-size: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 15px;
        .amount{
          color:${({theme})=>theme.colors.green}
        }
      }
      .information {
        font-size: 40px;
        color:${({theme})=>theme.colors.green};
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
