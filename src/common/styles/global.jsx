import {injectGlobal} from 'styled-components'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
	  padding: 0;
	  overflow-x: hidden;
	  min-width: 320px;
	  background: white;
	  font-family: 'Lato', 'Helvetica Neue', Arial, Helvetica, sans-serif;
	  font-size: 14px;
	  line-height: 1.4285em;
	  color: rgba(0, 0, 0, 0.87);
  }

  .pushable {
	  height: 100%;
	  overflow-x: hidden;
	  padding: 0em !important;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  ${''/* body ::-webkit-scrollbar {
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
