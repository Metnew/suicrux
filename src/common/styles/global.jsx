import {injectGlobal} from 'styled-components'

// NOTE: some styles are duplicated to make SSRed app looks better
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

  #app {
    width: 100%;
    height: 100%;
  }
`
