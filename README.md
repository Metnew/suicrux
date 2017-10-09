# React-Semantic.UI-Starter

[![Greenkeeper badge](https://badges.greenkeeper.io/Metnew/react-semantic.ui-starter.svg)](https://greenkeeper.io/)

![](https://github.com/Metnew/react-semantic.ui-starter/blob/for-gh/screen.gif)

### Demo: ~~[reatty.now.sh](https://reatty.now.sh/auth)~~ Temporarily unavailable:(
<div>
<a href="https://app.codesponsor.io/link/cFthevq5iGu9WkCHS316WqmS/Metnew/react-semantic.ui-starter" rel="nofollow"><img src="https://app.codesponsor.io/embed/cFthevq5iGu9WkCHS316WqmS/Metnew/react-semantic.ui-starter.svg" style="width: 888px; height: 68px;" alt="Sponsor" /></a>

[![Build Status](https://travis-ci.org/Metnew/react-semantic.ui-starter.svg?branch=master)](https://travis-ci.org/Metnew/react-semantic.ui-starter)
[![Join the chat at https://gitter.im/react-semantic-ui-starter/Lobby](https://badges.gitter.im/react-semantic-ui-starter/Lobby.svg)](https://gitter.im/react-semantic-ui-starter/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![bitHound Code](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/code.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter)
[![bitHound Overall Score](https://www.bithound.io/github/Metnew/react-semantic.ui-starter/badges/score.svg)](https://www.bithound.io/github/Metnew/react-semantic.ui-starter)
<!-- [![codecov](https://codecov.io/gh/Metnew/react-semantic.ui-starter/branch/master/graph/badge.svg)](https://codecov.io/gh/Metnew/react-semantic.ui-starter) -->

</div>

### What is this?
**Fullstack** **isomorphic** boilerplate with **server-side rendering** and **lazy-loading** for your **new Progressive Web App**.

### Quick intro

##### [Why this starter uses `react-semantic-ui`?](/docs/SUI.md)
TL;DR: You're always free to use your own UI framework. The starter is "UI-framework-agnostic".    
**[UI framework comparison here.](https://hackernoon.com/the-coolest-react-ui-frameworks-for-your-new-react-app-ad699fffd651)**

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
- **[Offline-plugin](https://github.com/NekR/offline-plugin)**, **[favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin)**,  **[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)**, **[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)**, **[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)**, **[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)**, **[webpack-common-shake](https://github.com/indutny/webpack-common-shake)**.

#### Server:
- **[rapscallion](https://github.com/FormidableLabs/rapscallion)** - async server-side rendering.
- **[morgan](https://www.npmjs.com/package/morgan)** - request logger middleware.
- **[helmet](https://github.com/helmetjs/helmet)** - secure your Express app.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** - cookie parsing middleware.
- **[body-parser](https://github.com/expressjs/body-parser)** - body parsing middleware
- **[compression](https://github.com/expressjs/compression)** -  compression middleware (gzip).
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - JWT ~~for the win~~ for Auth.

#### Other:
- **[ESDoc](https://github.com/esdoc/esdoc)** - docs generator.
- **[Jest](https://facebook.github.io/jest/)** - awesome testing framework.
- [And more tools for building and testing...](https://github.com/Metnew/react-semantic.ui-starter/blob/master/package.json)

### Usage

#### Install:
```bash
# clone repo without full git history
git clone --depth=1 https://github.com/Metnew/react-semantic.ui-starter.git
cd react-semantic.ui-starter
# You can remove .git folder if you don't want to pull new features or need your own repo
# to remove folder run: rm -rf .git
# install dependencies
npm install
```

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
`BASE_API`: App uses this path for requests with relative urls.    
`SENTRY_PUBLIC_DSN`: Your Sentry public DSN.      
`SENTRY_DSN`: Your Sentry full(private) DSN for server-side error handling.    
`APP_LANGUAGE`: Language of your app.     
`DIST_PATH`: (by default: `/dist/client/<APP_LANGUAGE>`). Path where server search for the index.html of your **built** app.    


#### How it works?

##### **[Most commonly asked questions are here.](/docs/FAQ.md)**

Some guides are already finished, some aren't. I update branch very often, so improved docs and explanations will be very soon.

##### ~~[Webpack configuration (not finished)](/docs/webpack.md)~~
##### [What's the magic behind `npm run dev`?](/docs/scripts.md)
##### [How i18n works?](/docs/i18n.md)
##### [Testing.](/docs/testing.md)
##### [Why this starter uses `react-semantic-ui`?](/docs/SUI.md)
##### ~~[How does SSR work? (not finished)](/docs/ssr.md)~~
##### ~~[Environment variables and configuration. (not finished)](/docs/env_vars.md)~~
##### ~~[Starter architecture and design. (not finished)](/docs/design.md)~~


#### Nearest future:
- SSR with HMR on client and server from one process. *(next.js-like HMR)*
- Better docs
- Semver
- CLI app


### Something very important:

> Have a question? Ask! :wink:

Any help is highly appreciated because the project still has only one maintainer (ha-ha, yeah it's me :smiling_imp:).
PRs and issues are always welcome.

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>

### LICENSE
MIT
