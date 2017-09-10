// @flow
import {createBrowserHistory, createMemoryHistory} from 'history'
const selectHistory = () => {
	return process.env.BROWSER ? createBrowserHistory : createMemoryHistory
}

export default selectHistory()()
