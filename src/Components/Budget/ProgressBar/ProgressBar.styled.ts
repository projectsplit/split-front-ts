import styled from "styled-components";

export const StyledProgressBar = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.inputGrey};
  border-color: ${({ theme }) => theme.colors.inputGrey};
  border-style: solid;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: none;
  border-radius: 6px;
  padding: 0.8rem;
  .budgetTitle {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  .progressBar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .targetIcon {
      color: ${({ theme }) => theme.colors.deepPurple};
      font-size: 30px;
    }
    .wrapper {
      position: relative;
      width: 100%;
      background-color: green;
      border-radius: 1rem;
      display: grid;
      height: 1.5rem;
      .wrapper > * {
        grid-column: 1 / -1;
        grid-row: 1 / -1;
      }
      .bar {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        border-radius: 6px;
      }
      .bar:after {
        content: "";
        width: 100%;
        height: 100%;
        background-color: blue;
        transform: translateX(calc(-100% + 65 * 1%));
        transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);

        /* width: calc(var(--progress) * 1%); */
      }
    }
  }
`;
