import {injectGlobal} from 'styled-components'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  ${'' /* body ::-webkit-scrollbar {
    width: 0;
  }

  body ::-webkit-scrollbar-track {
    all: unset!important;
  }

  body ::-webkit-scrollbar-thumb {
      all: unset!important;
    }

  body ::-webkit-scrollbar-thumb:window-inactive {
      all: unset!important;
    } */}


  #app {
    width: 100%;
    height: 100%;
  }
`
