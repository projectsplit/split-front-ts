import { createGlobalStyle } from 'styled-components'
import '@fontsource-variable/nunito'

const GlobalStyles = createGlobalStyle`

  * {
    border-radius: inherit;
    border-width: inherit;
    border-color: inherit;
    font-size: inherit;
    color: inherit;
  }

  html {
  }
  
  #root {
  }
  
  input {
    font-family: ${({ theme }) => theme.font.family};
  }

  body {
    font-family: ${({ theme }) => theme.font.family};
    color: ${({theme}) => theme.color.text1};
    background-color: ${({ theme }) => theme.color.background0};
    font-size: ${({ theme }) => theme.font.default};
    border-color: ${({ theme }) => theme.color.border1};
    border-radius: 5px;
    border-width: 1px;
    margin: 0;
    padding: 0;
  }

`

export default GlobalStyles