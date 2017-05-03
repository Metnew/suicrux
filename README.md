# React-Semantic.UI-Starter

## Out-of-box:

![](https://github.com/Metnew/react-semantic.ui-starter/blob/for-gh/screen.gif)

## DEMO: [You can find it here](https://metnew.github.io/react-semantic.ui-starter/)

[![Build Status](https://travis-ci.org/Metnew/react-semantic.ui-starter.svg?branch=master)](https://travis-ci.org/Metnew/react-semantic.ui-starter)
[![codecov](https://codecov.io/gh/Metnew/react-semantic.ui-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/Metnew/react-semantic.ui-starter)
[![David](https://img.shields.io/david/metnew/react-semantic.ui-starter.svg)]()
[![David](https://img.shields.io/david/dev/metnew/react-semantic.ui-starter.svg)]()
[![bitHound Overall Score](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/score.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter)
[![Known Vulnerabilities](https://snyk.io/test/github/metnew/react-semantic.ui-starter/badge.svg)](https://snyk.io/test/github/metnew/react-semantic.ui-starter)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
<!-- [![JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard) -->
<!-- [![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate) -->

### What is it?
Production-ready, performance-first, optimized, robust, fully-featured boilerplate/example for your **new Progressive Web App**.

#### Lighthouse result - [you can find it here](https://googlechrome.github.io/lighthouse/viewer/?gist=cd19fc335d4dc2abfbba10ee550bd0c8)
SPOILER: 97/100. It might be better/worse in your browser.

#### DOMContentLoaded, and etc:
When the app is cached with Service Workers:
<img src="https://github.com/Metnew/react-semantic.ui-starter/blob/for-gh/after-cached.png" />

#### Includes:

- **[React](https://facebook.github.io/react/)** and **[Redux](http://redux.js.org/)**
- **[React-Router v4(!)](https://github.com/ReactTraining/react-router)** + **[React-Router-Redux v5(!)](https://github.com/reactjs/react-router-redux)**
- **[JSON-server](https://github.com/typicode/json-server)** - mock db.
- **[Redux-thunk](https://github.com/gaearon/redux-thunk)** and **[Redux-Devtools-Extension](https://github.com/zalmoxisus/redux-devtools-extension)**
- **[Fetch polyfill](https://github.com/github/fetch)**
- **[Semantic-ui-react](http://react.semantic-ui.com/)** - UI components.
- **[Store2](https://github.com/nbubna/store)** - LocalStorage access.
- **[Webpack 2](https://webpack.js.org)**:
    - babel (stage-0),
    - **HMR**, devServer, hotMiddleware,
    - better code optimization with **[Babel React Optimize](https://github.com/thejameskyle/babel-react-optimize)**,
    - Remove unused css with **[purifycss-webpack](https://github.com/webpack-contrib/purifycss-webpack)**
- **[Jest](https://facebook.github.io/jest/)** and **[Enzyme](https://github.com/airbnb/enzyme)** - awesome libraries for testing.
- **[why-did-you-update](https://github.com/garbles/why-did-you-update)** and **[React-Addons-Perf](https://facebook.github.io/react/docs/perf.html)** for better performance optimization.
- **[Lodash](https://lodash.com/)** - is a dependency of Semantic-ui-react.  With tree-shaking unused code never makes it into the final bundle.
- **[Offline-plugin](https://github.com/NekR/offline-plugin)**, **[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)** and **[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)** for your next progressive app.
- [And more tools for building and testing...](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/package.json)

### Usage

#### Install:
```bash
git clone https://github.com/Metnew/react-semantic.ui-starter.git
cd react-semantic.ui-starter && rm -rf .git
npm install
```

#### Run:

```bash
npm run dev # run app in dev mode
npm run db  # run mock db for app(from another process)
```

#### Build:

```bash
npm run build # build app
npm run build:demo # build with process.env.BUILD_DEMO = true
```

These commands generate the `dist` folder.

#### Test:

```bash
npm run test # run tests with Jest
```

### FAQ

#### Where are static assets?
You can store static assets (images, videos) in `/static` folder.

#### Where is manifest.json?
You can find it in `webpack_config/config.js`

#### Is SSR available?
It's under active development inside `/server` folder.

#### How it differs from other starters?
Performance-first.
**Main purpose - build highly customizable skeleton for PWA, with SSR, following best practices.**

#### "You have a components folder and containers folder..and in the container you have another components folder?"

Components inside `containers/**/components` are components that are required by container.

For example, `Dashboard`(container) has `DashboardComponent`(component). You can think about `DashboardComponent` as "Isolated component", it isn't used in app anywhere except own parent-container.

Components in components are components that:
1. Don't have own logic and connection with state (as opposite to containers)
2. Aren't "isolated".(!)

As your app's `components` folder increases in size, it could be refactored to similar structure that implemented in [semantic-ui-react]( https://github.com/Semantic-Org/Semantic-UI-React/tree/master/src).

#### Where are tests?
There are tests for actions and for reducers.
Each reducer/action has own folder, where you can find:
1. Reducer/action itself.
2. Tests for it.

#### How to write tests?
You can find [action testing example here.](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/actions/auth/index.test.js)
It uses [redux-mock-store.](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/actions/auth/index.test.js)

#### How does Auth work?
Migration from React-Router v3 to v4 may cause some problems.
There is no `onEnter` props in `Route` component.

But we can fix this:
1. Create [global routing object.](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/routing/index.jsx#L9)
2. Create [RouteAuth](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/components/RouteAuth/index.jsx) component that protects child component from unauthorized users.
3. Pass a function that checks is user allowed to visit route as prop [in every `RouteAuth` component.](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/routing/index.jsx#L52)
4. When RouteAuth renders [it calls that function.](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/routing/index.jsx#L52)
5. As [`authCheck` function can call redux store](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/components/Root/index.jsx#L19-L30), we can access redux's state before `Route` is rendered.
6. Profit!!!!!
7. We have access to redux state in the function that allows `Route` to be rendered.
8. Also, there is a handler for [auth logic in App container.](https://github.com/Metnew/react-semantic.ui-starter/blob/dev/common/containers/App/index.jsx#L178-L184)

#### How does the built app look?
**[Like this.](https://github.com/Metnew/react-semantic.ui-starter/tree/gh-pages)**

### Also:

[Unstable branch with **latest features.**](https://github.com/Metnew/react-semantic.ui-starter/tree/dev)

> Have a question? Ask it. :wink:

PRs, and issues are welcome :smiling_imp:

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>

### LICENSE

MIT
