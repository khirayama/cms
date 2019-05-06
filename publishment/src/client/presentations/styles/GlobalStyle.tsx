import * as styled from 'styled-components';

export const GlobalStyle = styled.createGlobalStyle`
  html {
    font-family: sans-serif;
  }

  html,
  body,
  #root {
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
`;
