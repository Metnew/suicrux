# React-Semantic.UI-Starter

## Out-of-box:

![](https://github.com/Metnew/react-semantic.ui-starter/blob/for-gh/screen.gif)

## DEMO: [You can find it here](https://metnew.github.io/react-semantic.ui-starter/)

[![Build Status](https://travis-ci.org/Metnew/react-semantic.ui-starter.svg?branch=master)](https://travis-ci.org/Metnew/react-semantic.ui-starter)
[![codecov](https://codecov.io/gh/Metnew/react-semantic.ui-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/Metnew/react-semantic.ui-starter)
[![bitHound Dependencies](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/dependencies.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/devDependencies.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/code.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter)
[![bitHound Overall Score](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/score.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### What is it?
Production-ready, performance-first, optimized, robust, fully-featured boilerplate/example with **Server-side rendering** and **lazy-loading** for your **new Progressive Web App**.

#### Lighthouse result - [you can find it here](https://googlechrome.github.io/lighthouse/viewer/?gist=cd19fc335d4dc2abfbba10ee550bd0c8)
SPOILER: 97/100. It might be better/worse in your browser.

#### Includes:
- **[React](https://facebook.github.io/react/)** and **[Redux](http://redux.js.org/)**
- **SASS**, **[PostCSS](https://github.com/postcss/postcss)**,  and **[styled-components](https://github.com/styled-components/styled-components)** support.
- **[React-Router v4](https://github.com/ReactTraining/react-router)** + **[React-Router-Redux v5](https://github.com/reactjs/react-router-redux)**
- **[JSON-server](https://github.com/typicode/json-server)** - mock db.
- **[rapscallion](https://github.com/FormidableLabs/rapscallion)** - async server-side rendering.
- **[ESDoc](https://github.com/esdoc/esdoc)** - docs generator.
- **[Redux-thunk](https://github.com/gaearon/redux-thunk)**,  **[Redux-Devtools-Extension](https://github.com/zalmoxisus/redux-devtools-extension)**
- **[Fetch polyfill](https://github.com/github/fetch)** and **[normalizr](https://github.com/paularmstrong/normalizr)**(api response normalization)
- **[Semantic-ui-react](http://react.semantic-ui.com/)** - UI components.
- **[Store2](https://github.com/nbubna/store)** and **[js-cookie](https://github.com/js-cookie/js-cookie)** - LocalStorage and cookies.
- **[Webpack 3](https://webpack.js.org)**:
    - Babel (stage-0),
    - **HMR**, devServer, hotMiddleware,
    - i18n support with **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**
    - Check your code with **[Eslint](https://github.com/eslint/eslint)** and **[Stylelint](https://github.com/stylelint/stylelint)** (that you can uncomment inside `postcss.config.js`)
- **[Jest](https://facebook.github.io/jest/)** and **[Enzyme](https://github.com/airbnb/enzyme)** - awesome libraries for testing.
- **[why-did-you-update](https://github.com/garbles/why-did-you-update)** and **[React-Addons-Perf](https://facebook.github.io/react/docs/perf.html)** for better performance optimization.
- **[Lodash](https://lodash.com/)** - is a dependency of Semantic-ui-react.
- **[Offline-plugin](https://github.com/NekR/offline-plugin)**, **[favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin)**,  **[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)** and **[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)**, **[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)**, **[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)**, **[webpack-common-shake](https://github.com/indutny/webpack-common-shake)** for your new awesome app.
- [And more tools for building and testing...](https://github.com/Metnew/react-semantic.ui-starter/blob/master/package.json)

### Usage

#### Install:
```bash
git clone --depth=1 https://github.com/Metnew/react-semantic.ui-starter.git
cd react-semantic.ui-starter && rm -rf .git
npm install
```

#### ENV vars:
BASE_API - App uses this path for requests with relative urls. By default `http://localhost:4000/api/v1` - json-server.
BASE_API is required for `npm run ssr`, `npm run dev`, `npm run build`

#### Run:

```bash
###############################################################
npm run dev # run app in dev mode, BASE_API env var is required!
###############################################################
npm run db  # run mock db for app(from another process)
###############################################################
npm run ssr # run server-side rendering (IT NEEDS already built app) and BASE_API env var is required!
###############################################################
```

#### Build:

```bash
###############################################################
npm run build # build app, accept next env vars:
# APP_LANGUAGE=ru npm run build - build only selected language, if isn't set, then build app with all i18n languages!
# ANALYZE_BUNDLE npm run build - add `webpack-bundle-analyzer` to plugins
npm run build:demo # build with process.env.BUILD_DEMO = true
###############################################################
```

These commands generate the `dist` folder.

#### Test:

```bash
npm run test # run tests with Jest, BASE_API env var is required!
```

#### Lint:

```bash
npm run lint:styles  # lint styles with Stylelint
npm run lint:scripts # lint scripts with ESlint
```

#### Docs:

```bash
npm run docs # generate docs and `serve`
```

#### Nearest future:

- **Project must be isomorphic**. Code must somehow works with React-Native too. I'll be very happy, if you can help me with this task :wink:, or just recommend something.

### FAQ

#### Where are static assets?
You can store static assets (images, videos) in `/static` folder.

#### Where is manifest.json?
You can find it in `webpack_config/config.js`

#### Is SSR available?
Yes! Check `/src/server/server.js`. App uses rapscallion for async rendering on server.

#### How lazy-loading implemented:
Check `src/common/routing/index.js`. TL;DR: dynamic `import()`.

#### Is theming available?
Yes, with styled-components's `<ThemeProvider>` you can specify your own theme. By default, app uses theme from [www.materialpallette.com](https://www.materialpalette.com/).

#### How it differs from other starters?
App is designed for big projects. Personally, I use almost similar boilerplate in production.
**Main purpose - build highly customizable isomorphic(!) skeleton for PWA, with SSR, code-splitting, following best practices.**

#### "You have a components folder and containers folder..and in the container you have another components folder?"

Components inside `containers/**/components` are components that are required by container.

For example, `Dashboard`(container) has `DashboardComponent`(component). You can think about `DashboardComponent` as "Isolated component", it isn't used in app anywhere except own parent-container.

Components in components are components that:
1. Don't have own logic and connection with state (as opposite to containers)
2. Aren't "isolated".(!)

#### Where are tests?
There are tests for actions and for reducers.
Each reducer/action has own folder, where you can find:
1. Reducer/action itself.
2. Tests for it.

#### How to write tests?
You can find [action testing example here.](https://github.com/Metnew/react-semantic.ui-starter/blob/master/src/common/actions/auth/index.test.js)
It uses [redux-mock-store.](https://github.com/Metnew/react-semantic.ui-starter/blob/master/src/common/actions/auth/index.test.js)

#### How does the built app look?
**[Like this.](https://github.com/Metnew/react-semantic.ui-starter/tree/gh-pages)**

### Also:

> Have a question? Ask it. :wink:

PRs, and issues are welcome :smiling_imp:

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>

### LICENSE

MIT
