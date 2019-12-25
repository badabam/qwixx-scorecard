import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: sans-serif;
    font-size: 22px;
  }

  #root {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
`
