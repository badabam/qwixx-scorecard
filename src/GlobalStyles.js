import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 22px;

    @media (orientation: portrait) {
      width: 100vh;
      height: 100vw;
      transform-origin: top left;
      transform: rotate(90deg) translate(0, -100%);

    }
  }

  #root {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`
