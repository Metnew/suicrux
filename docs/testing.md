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
		"\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest_config/__mocks__/fileMock.js",
		"\\.(css|less|scss|sass)$": "<rootDir>/jest_config/__mocks__/styleMock.js"
	},
	"coveragePathIgnorePatterns": ["style.jsx", "/styles"]
}

```
Jest doesn't know about webpack aliases, so we have to provide them inside `.babelrc` (using `"module-resolver"` plugin). It's more recommended than writing all aliases inside `"moduleNameMapper"`
Then we have to provide additional configuration for Jest using `setupFiles` property in Jest config object.

`jest_config/setupJest.js`
```js
import {configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Add fetch polyfill for node
global.fetch = require('isomorphic-fetch')
// Add `BASE_API` env variable
process.env.BASE_API = process.env.BASE_API || 'http://localhost:3000/api/v1'
process.env.BROWSER = false

const adapter = new Adapter()
configure({adapter})
```

That's all. Jest is ready.

## How to test React components?

### Snapshot testing
What is snapshot testing? See the official Jest docs [about this](https://facebook.github.io/jest/docs/snapshot-testing.html) and take a look at simple example](https://facebook.github.io/jest/docs/en/tutorial-react.html#content).

### DOM testing
You can find [example of DOM testing](https://facebook.github.io/jest/docs/en/tutorial-react.html#dom-testing) in Jest docs.
The starter *doesn't include* tests for React components. Feel free to submit PR to add this feature.

## How to test Redux?

One of the simplest ways to test redux actions and reducers is to use [`redux-mock-store`](https://github.com/Metnew/suicrux/blob/master/src/common/actions/auth/index.test.js) library.

### Actions
For example, tests for `auth` actions in `src/common/actions/auth/index.test.js` look like:
```js
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
// Import redux actions
import {
	LOGIN_AUTH_SUCCESS,
	LOGIN_AUTH_PENDING,
	LOGIN_AUTH,
} from 'actions/auth'
// Add middlewares that our mock store will use
// It can be redux-thunk or routingMiddleware from `react-router-redux`
// Or any other middleware that you use in your app
const middlewares = [thunk]
// Create mockStore for testing
const mockStore = configureMockStore(middlewares)

const loginPending = {
	meta: null,
	type: LOGIN_AUTH_PENDING
}

describe('Auth actions', () => {
	/**
	 * @arg {Function} done - is a callback that you need to execute,
	 * If your action performing async task (e.g. request to API)
	 */
	test('creates LOGIN_AUTH_SUCCESS when LOGIN_AUTH was successful', done => {
		const successPayload = {
			token: 'nothing'
		}

		nock('http://localhost:3000/api/v1')
			.post('/auth')
			.reply(200, successPayload)
		// Create expected output of your action
		const expectedActions = [
			loginPending,
			{
				type: LOGIN_AUTH_SUCCESS,
				payload: successPayload
			}
		]
		// Create store for testing
		const store = mockStore({})
		// Dispatch action
		store.dispatch(LOGIN_AUTH()).then(() => {
			// Compare expected and real outputs
			expect(store.getActions()).toEqual(expectedActions)
			// Call `done()` callback, because action is async
			done()
		})
	})
})
```

### Reducers
Let's test handling of `LOGIN_AUTH_SUCCESS` action in auth reducer (`src/common/reducers/auth/index.test.js`).
```javascript
/* eslint-disable */
// Import `auth` reducer and initialState for this
import {auth as reducer, initialState} from 'reducers/auth'
// Import all actions
import {LOGIN_AUTH_SUCCESS} from 'actions/auth'

describe('AUTH REDUCER', () => {
	// Create test action for reducer
	const action = {
		type: LOGIN_AUTH_SUCCESS,
		result: {
			token: 'iamnotatoken'
		}
	}

	it('should handle LOGIN_AUTH_SUCCESS', () => {
		// User is logged in and has `token` after LOGIN_AUTH_SUCCESS
		expect(reducer(initialState, action)).toEqual({
			...initialState,
			token: 'iamnotatoken',
			isLoggedIn: true
		})
	})
})
```

### Where to store tests?
Store tests in the same folder with the component/action/reducer.

### Also
There are [other solutions](https://github.com/brillout/awesome-react-components#test) to deal with testing, so you're always free to choose testing library.
