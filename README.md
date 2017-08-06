# React-Semantic.UI-Starter

![](https://github.com/Metnew/react-semantic.ui-starter/blob/for-gh/screen.gif)

### Demo: [reatty.now.sh](https://reatty.now.sh/auth)
<div>

[![Build Status](https://travis-ci.org/Metnew/react-semantic.ui-starter.svg?branch=master)](https://travis-ci.org/Metnew/react-semantic.ui-starter)
[![Join the chat at https://gitter.im/react-semantic-ui-starter/Lobby](https://badges.gitter.im/react-semantic-ui-starter/Lobby.svg)](https://gitter.im/react-semantic-ui-starter/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![bitHound Code](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/code.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter)
[![bitHound Overall Score](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/score.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter)
<!-- [![codecov](https://codecov.io/gh/Metnew/react-semantic.ui-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/Metnew/react-semantic.ui-starter) -->

</div>

### What is it?
Production-ready, performance-first, optimized, robust, **fullstack** **isomorphic** boilerplate/example with **server-side rendering** and **lazy-loading** for your **new Progressive Web App**.

### What's inside?

[![bitHound Dependencies](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/dependencies.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/master/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/devDependencies.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/master/dependencies/npm)

#### Frontend:
- **[React](https://facebook.github.io/react/)** and **[Redux](http://redux.js.org/)**
- **SASS**, **[PostCSS](https://github.com/postcss/postcss)**,  and **[styled-components](https://github.com/styled-components/styled-components)** support.
- **[React-Router v4](https://github.com/ReactTraining/react-router)** + **[React-Router-Redux v5](https://github.com/reactjs/react-router-redux)**
- **[Redux-thunk](https://github.com/gaearon/redux-thunk)**,  **[Redux-Devtools-Extension](https://github.com/zalmoxisus/redux-devtools-extension)**
- **[Fetch polyfill](https://github.com/matthew-andrews/isomorphic-fetch)**, **[Promise polyfill](https://github.com/stefanpenner/es6-promise)** and **[normalizr](https://github.com/paularmstrong/normalizr)** (api response normalization)
- **[Semantic-ui-react](http://react.semantic-ui.com/)** - UI components.
- **[Store2](https://github.com/nbubna/store)** and **[js-cookie](https://github.com/js-cookie/js-cookie)** - LocalStorage and cookies.
- **[why-did-you-update](https://github.com/garbles/why-did-you-update)** and **[React-Addons-Perf](https://facebook.github.io/react/docs/perf.html)** for better performance optimization.
- **[Lodash](https://lodash.com/)** - is a dependency of Semantic-ui-react.

#### Build (Webpack):
- **[Webpack 3](https://webpack.js.org)**:
    - Babel (stage-0),
    - **HMR**, devServer, hotMiddleware,
    - i18n support with **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**
    - Check your code with **[Eslint](https://github.com/eslint/eslint)** and **[Stylelint](https://github.com/stylelint/stylelint)** (that you can uncomment inside `postcss.config.js`)
- **[Offline-plugin](https://github.com/NekR/offline-plugin)**, **[favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin)**,  **[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)**, **[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)**, **[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)**, **[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)**, **[webpack-common-shake](https://github.com/indutny/webpack-common-shake)** for your new awesome app.

#### Server:
- **[rapscallion](https://github.com/FormidableLabs/rapscallion)** - async server-side rendering.
- **[morgan](https://www.npmjs.com/package/morgan)** - request logger middleware.
- **[helmet](https://github.com/helmetjs/helmet)** - secure your Express app.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** - cookie parsing middleware.
- **[body-parser](https://github.com/expressjs/body-parser)** - body parsing middleware
- **[compression](https://github.com/expressjs/compression)** -  compression middleware (gzip).
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - JWT ~~for the win~~ for Auth!

#### Other:
- **[ESDoc](https://github.com/esdoc/esdoc)** - docs generator.
- **[Jest](https://facebook.github.io/jest/)** - awesome testing framework.
- [And more tools for building and testing...](https://github.com/Metnew/react-semantic.ui-starter/blob/master/package.json)

### Usage

#### Install:
```bash
git clone --depth=1 https://github.com/Metnew/react-semantic.ui-starter.git
cd react-semantic.ui-starter && rm -rf .git
npm install
```

#### ENV vars:
ENV vars are **very important** for configuration.

#### Client ENV vars:
`GA_ID`: Your Google analytics ID.     
`BASE_API`: `/api/v1` by default. App uses this path for requests with relative urls     
`SENTRY_PUBLIC_DSN`: Your Sentry public DSN.    
`APP_LANGUAGE`: `en` by default. Build app with this language. Check `/i18n` folder and **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**.     
`ANALYZE_BUNDLE`: Run webpack-bundle-analyzer after build.    

#### Server ENV vars:
`PORT`: Port on which your app run.     
`JWT_SECRET`: JWT_SECRET :smile:    
`BASE_API`: App uses this path for requests with relative urls   
`SENTRY_PUBLIC_DSN`: Your Sentry public DSN    
`SENTRY_DSN`: Your Sentry full(private) DSN for server.   
`APP_LANGUAGE`: Language of your app.    
`DIST_PATH`: (by default: `/dist/client/<APP_LANGUAGE>`). Path where server search for the index.html of your **built** app.   

#### Development:

```bash
npm run dev # run both frontend and server in dev mode(using `concurrently`)

npm run frontend_dev # run frontend in dev mode.

npm run server_dev  # run server in dev mode
```

#### Build:

```bash
npm run build # build both frontend and server

npm run frontend_build # build frontend

npm run server_build # build server
```

#### Run:
```bash
# npm run build - at first build app.
npm run start # run app. You need already built app for this!
# then visit localhost:4000 in your browser, if you didn't specify PORT env var
```

#### Deploy:
If you use **[now](https://github.com/zeit/now)** on OSS(free) plan - you will run out of memory on `npm run build`. I recommend you to disable some non-critical plugins (ModuleConcatenationPlugin, SriPlugin, FaviconsWebpackPlugin). [Demo that was deployed to "now"](https://reatty.now.sh/)

#### Test:

```bash
npm run test # run tests with Jest, BASE_API env var is required!
```

#### Lint:

`eslint-loader` is already included in webpack, but if you want to lint code without webpack:

```bash
npm run lint:styles  # lint styles with Stylelint
npm run lint:scripts # lint scripts with ESlint
```

#### Docs:

Powered by ESDoc.

```bash
npm run docs # generate docs and `serve`
```

#### Nearest future:

- SSR with HMR on client and server from one process. *(testing right now)*
- Improved docs!

### FAQ

#### Where are static assets?
You can store static assets (images, videos) in `/static` folder.

#### Where is manifest.json?
You can find it in `webpack_config/config.js`

#### Is SSR available?
Yes! Check `/src/server/ssr/`. App uses rapscallion for async rendering on server.

#### How lazy-loading implemented:
Check `src/common/routing/index.js` and `src/common/components/addons/LazyLoad`. TL;DR: dynamic `import()`.

#### Is theming available?
Yes, with styled-components's `<ThemeProvider>` you can specify your own theme. By default, app uses theme from [www.materialpallette.com](https://www.materialpalette.com/).

#### How it differs from other starters?
App is designed for big projects. Personally, I use almost similar boilerplate in production project.
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

### Also:

> Have a question? Ask! :wink:

PRs, and issues are welcome :smiling_imp:

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>

### LICENSE

MIT
