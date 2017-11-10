import {injectGlobal} from 'styled-components'

// NOTE: Styles of container elements duplicated to make SSR version without css looks prettier
injectGlobal`
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
	  padding: 0;
    transform: translate3d(0, 0, 0);
  }

  #app {
    width: 100%;
    height: 100%;
  }
`
