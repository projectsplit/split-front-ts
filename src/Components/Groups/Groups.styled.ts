import styled from "styled-components";

export const StyledGroups = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.lightColor};
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  padding: 14px;
  gap: 30px;
  .groupCategories{
    display: flex;
    flex-direction: row;
    justify-content:flex-start;
    gap:4px;
  }
  .groupsLogoStripe {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .groupStripe {
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

 

  .groupsInfo {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.layer6};
    .owe {
      color: ${({ theme }) => theme.colors.redish};
    }
    .owed {
      color: ${({ theme }) => theme.colors.green};
    }
  }
`;
