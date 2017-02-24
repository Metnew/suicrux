# Reatty
#### Demo: https://metnew.github.io/reatty

## Out-of-box:
<img src="./screen.gif" />

#### Includes:
- [React]() and [Redux]()
- [React-Router](https://github.com/ReactTraining/react-router) + [React-Router-Redux](https://github.com/reactjs/react-router-redux)
- [JSON-server](https://github.com/typicode/json-server) for dev purposes
- [Redux-thunk](https://github.com/gaearon/redux-thunk)
- [Fetch polyfill](https://github.com/github/fetch)
- [Semantic-ui-react](http://react.semantic-ui.com/) and normalize.css for UI
- [Store2](https://github.com/nbubna/store) - LocalStorage access
- Webpack, babel (stage-0 + decorators), Redux-dev-tools and testing utils: Karma, Chai, Phantom

### Usage
```bash
git clone https://github.com/Metnew/reatty.git reatty
cd reatty && rm -rf .git  
npm install
```

#### Run app in dev mode:
```
npm run dev # run app in dev mode
```

#### Run fake db:
```
npm run db  # run fake db for app
```
#### Build app:
```
npm run build
```

## Folder structure:

```
├── client - Your App
│   └── actions - application actions
│   ├── api - Services and XHR utils(also custom form validation, see InputComponent from components/common)
│   ├── components - components according to "Redux philosophy"
        └── common - common components of App, currently only wrapper for Semantic <Input /> component
│   ├── config - frontend config depending on REACT_WEBPACK_ENV
│   ├── containers - containers according to "Redux philosophy"
│   ├── reducers - application reducers
│   ├── styles - styles folder with scss vars, mixins, etc.
│   ├── index.jsx - project entry
│   ├── app.js - import deps and App component
│   ├── Root.js - Root component
│   ├── routing.js - Application routing
│   ├── index.html
├── db // fake db json and json-server
├── server - server code for SSR(not finished).
├── tests - Your tests
├── webpack_config - Webpack configuration scripts

```

### LICENSE
MIT
