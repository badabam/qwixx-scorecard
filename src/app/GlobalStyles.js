import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 22px;
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;

    @media (orientation: portrait) {
      width: 100vh;
      height: 100vw;
      transform-origin: top left;
      transform: rotate(90deg) translate(0, -100%);
    }
  }

  #root {
    /* position: fixed; */
    padding:  0 env(safe-area-inset-right) 0 env(safe-area-inset-left);
    /* top: 0; */
    /* right: env(safe-area-inset-right); */
    /* bottom: 0; */
  }
`
