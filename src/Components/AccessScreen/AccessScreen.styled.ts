import styled from "styled-components";
import mixins from "../styles/mixins";

export const StyledAccessScreen = styled.div`
  margin: 0rem 2rem 0rem 2rem;
  ${mixins.flex}
  ${mixins.flexDirectionColumn}
  color:${({ theme }) => theme.colors.lightColor}; //--light-color

  .loginBox {
    padding: 1rem 0.8rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.layer1};
    border-color: ${({ theme }) => theme.colors.layer1};
    border-style: "solid";

    .promptMsg {
      color: ${({ theme }) => theme.colors.lightColor};
      padding-bottom: 1rem;
      white-space: initial;
      font-size: 14px;
    }
    .controlsContainer {
      display: flex;
      flex-direction: column;

      .mailmsg {
        margin-top: 3px;
        white-space: initial;
        color: ${({ theme }) => theme.colors.pink};
        font-size: 12px;
      }

      .mailbox {
        display: flex;
        flex-direction: column;
        padding: 0 0 0.5rem 0;

        .mailmsg {
          white-space: initial;
          color: ${({ theme }) => theme.colors.pink};
          font-size: 12px;
        }
      }

      .or {
        color: ${({ theme }) => theme.colors.layer6};
        padding-top: 2rem;
        padding-bottom: 2rem;
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        color: ${({ theme }) => theme.colors.lightColor};

        &:after,
        &:before {
          content: "";
          display: block;
          background-color: ${({ theme }) => theme.colors.layer6};
          width: 100%;
          height: 1px;
          margin: 0 10px;
        }
      }
    }
  }
`;
