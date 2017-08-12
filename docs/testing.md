# Testing

## Jest

The boilerplate uses Jest for testing.
You can find more about Jest in [official docs](https://facebook.github.io/jest/).

You can run tests using `npm run test` that is an alias to `jest --config=jest_config/jest.config.json --coverage --forceExit || true"`.

### Configuring Jest

Jest configuration in `jest_config/jest.config.json` looks like:
```json
{
  "moduleFileExtensions": ["js", "jsx"],
  "rootDir": "../",
  "setupFiles": ["<rootDir>/jest_config/setupJest.js"],
  "automock": false,
  "moduleNameMapper": {
    "^actions$": "<rootDir>/src/common/actions",
    "^actions/auth$": "<rootDir>/src/common/actions/auth",
    "^actions/common$": "<rootDir>/src/common/actions/common",
    "^actions/layout$": "<rootDir>/src/common/actions/layout",
    "^actions/posts$": "<rootDir>/src/common/actions/posts",
    "^actions/users$": "<rootDir>/src/common/actions/users",

    "^api": "<rootDir>/src/common/api",

    "^reducers$": "<rootDir>/src/common/reducers",
    "^reducers/auth$": "<rootDir>/src/common/reducers/auth",
    "^reducers/layout$": "<rootDir>/src/common/reducers/layout",
    "^reducers/posts$": "<rootDir>/src/common/reducers/posts",
    "^reducers/users$": "<rootDir>/src/common/reducers/users",

    "^routing$": "<rootDir>/src/common/routing",
    "^components$": "<rootDir>/src/common/components",
    "^containers$": "<rootDir>/src/common/containers"
  }
}
```
Jest doesn't know about webpack aliases, so we have to provide them.   
Then we have to provide additional configuration for Jest using `setupFiles` property in Jest config object.

`jest_config/setupJest.js`
```js
// Add fetch polyfill for node
global.fetch = require('node-fetch')
// Add `BASE_API` env variable
process.env.BASE_API = process.env.BASE_API || 'http://localhost:4000/api/v1'
```

That's all. Jest is ready.

## How to test React components?

### Snapshot testing
What is snapshot testing? See the official Jest docs [about this](https://facebook.github.io/jest/docs/snapshot-testing.html) and take a look at simple example](https://facebook.github.io/jest/docs/en/tutorial-react.html#content).


### DOM testing
You can find [example of DOM testing](https://facebook.github.io/jest/docs/en/tutorial-react.html#dom-testing) in Jest docs.


The starter *doesn't include* tests for React components. Feel free to submit PR to add this feature.

## How to test Redux?

One of the simplest ways to test redux actions and reducers is to use [`redux-mock-store`](https://github.com/Metnew/react-semantic.ui-starter/blob/master/src/common/actions/auth/index.test.js) library.

### Actions
For example, tests for `auth` actions in `src/common/actions/auth/index.test.js` look like:
```js
// Disable Eslint for tests
/* eslint-disable */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
// Import all redux actions
import * as actions from 'actions'
// Add middlewares that our mock store will use
// It can be redux-thunk or routingMiddleware from `react-router-redux`
// Or any other middleware that you use in your app
const middlewares = [thunk]
// Create mockStore for testing
const mockStore = configureMockStore(middlewares)

describe('Auth actions', () => {
	/**
	 * @arg {Function} done - is a callback that you need to execute,
	 * If your action performing async task (e.g. request to API)
	 */
	it('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', done => {
		// Create expected output of your action
		const expectedActions = {
			type: actions.LOGIN_AUTH_SUCCESS,
			result: {
				token: 'nothing'
			}
		}
		// Create store for testing
		const store = mockStore({})
		// Dispatch action
		return store.dispatch(actions.LOGIN_AUTH).then(res => {
			// Compare expected and real outputs
			expect(res).toEqual(expectedActions)
			// Call `done()` callback, because action is async
			done()
		})
	})
})
```

### Reducers
Let's test handling of `LOGIN_AUTH_SUCCESS` action in auth reducer (`src/common/reducers/auth/index.test.js`) as an example.
```javascript
/* eslint-disable */
// Import `auth` reducer and initialState for this
import {auth as reducer, initialState} from 'reducers/auth'
// Import all actions
import * as actions from 'actions'

describe('AUTH REDUCER', () => {
	// Create test action for reducer
	const LOGIN_AUTH_SUCCESS = {
		type: actions.LOGIN_AUTH_SUCCESS,
		result: {
			token: 'iamnotatoken'
		}
	}

	it('should handle LOGIN_AUTH_SUCCESS', () => {
		// User is logged in and has `token` after LOGIN_AUTH_SUCCESS
		expect(reducer(initialState, LOGIN_AUTH_SUCCESS)).toEqual({
			...initialState,
			token: 'iamnotatoken',
			isLoggedIn: true
		})
	})
})
```

### Where to store tests?
Store tests in the same folder as the component/action/reducer itself.

### Also
There are [other solutions](https://github.com/brillout/awesome-react-components#test) to deal with testing, so you're always free to choose your testing library.
