import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

  * {
font-family: 'Inter', sans-serif;
  }

  body{
    background:${({ theme }) => theme.colors.body};
    
    margin: 0;
    
  }
  
  div{
    color:${({ theme }) => theme.colors.whiteText};
  }

  
`;

export default GlobalStyles;
