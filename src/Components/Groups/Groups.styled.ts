import styled from "styled-components";

export const StyledGroup = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightColor};
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 14px;
  gap: 60px;
  .groupsLogoStripe {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .groupsInfo {
    display: flex;
    flex-direction: row;
    gap: 15px;
    align-items: end;
    .groupsName {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .group {
    color: ${({ theme }) => theme.colors.deepPurple};
    font-size: 25px;
    position: relative;
  }
`;
