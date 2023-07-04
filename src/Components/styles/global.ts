import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {

  }

  body{
    background:${({ theme }) => theme.colors.body};
    font-family: 'Inter', sans-serif;
    margin: 0;
  }

`;

export default GlobalStyles;
