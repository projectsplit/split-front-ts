import styled from "styled-components";

export const StyledActiveGroups = styled.div`
  /* flex: 1;
  overflow-y: auto; */

  @keyframes spin-animation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .groupList {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .spinner {
      align-self: center;
      animation: spin-animation 0.8s linear infinite;
      font-size: 25px;
      color: ${({ theme }) => theme.colors.labelColor6};
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
`;
