// @flow
import {createBrowserHistory, createMemoryHistory} from 'history'
const selectHistory = (): Function => {
	return process.env.BROWSER ? createBrowserHistory : createMemoryHistory
}

export default selectHistory()()
