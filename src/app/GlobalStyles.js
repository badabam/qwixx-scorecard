import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 22px;
    background: black;

    @media (orientation: portrait) {
      width: 100vh;
      height: 100vw;
      transform-origin: top left;
      transform: rotate(90deg) translate(0, -100%);
    }
  }

  #root {
    position: fixed;
    /* padding:  0 env(safe-area-inset-right) 0 env(safe-area-inset-left); */
    top: 0;
    right: env(safe-area-inset-right);
    bottom: 0;
    left: env(safe-area-inset-left);
  }
`
