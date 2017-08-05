import {injectGlobal} from 'styled-components'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  /* After one of the latest releases Semantic styles scrollbars!
   * It's important to remember this info, when you work on custom scrollbar
   */

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
