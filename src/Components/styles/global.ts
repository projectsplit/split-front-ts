import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`

  * {

  }

  body {
    background:${({ theme }) => theme.colors.body};
    font-family: 'Open Sans';
    margin: 0;
    padding: 0;
  }
  
  div {
    /* color:${({ theme }) => theme.colors.whiteText}; */
  }
`

export default GlobalStyles;
