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
    display: flex;
    flex-direction: column;
    gap: 15px;
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
