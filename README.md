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
- **[React 16](https://facebook.github.io/react/)** and **[Redux](http://redux.js.org/)**
- **SASS**, **[PostCSS](https://github.com/postcss/postcss)**,  and **[styled-components](https://github.com/styled-components/styled-components)** support.
- **[React-Router v4](https://github.com/ReactTraining/react-router)** + **[React-Router-Redux v5](https://github.com/reactjs/react-router-redux)**
- **[Redux-thunk](https://github.com/gaearon/redux-thunk)**,  **[Redux-Devtools-Extension](https://github.com/zalmoxisus/redux-devtools-extension)**
- **[Fetch polyfill](https://github.com/matthew-andrews/isomorphic-fetch)**, **[Promise polyfill](https://github.com/stefanpenner/es6-promise)** and **[normalizr](https://github.com/paularmstrong/normalizr)** (api response normalization)
- **[Semantic-ui-react](http://react.semantic-ui.com/)** - UI components.
- **[Store2](https://github.com/nbubna/store)** and **[js-cookie](https://github.com/js-cookie/js-cookie)** - LocalStorage and cookies.
- **[Lodash](https://lodash.com/)** - is a dependency of Semantic-ui-react.

#### Build (Webpack):
- **[Webpack 3](https://webpack.js.org)**:
    - Babel (stage-0),
    - **HMR**, devServer, hotMiddleware,
    - i18n support with **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**
    - Check your code with **[Eslint](https://github.com/eslint/eslint)** and **[Stylelint](https://github.com/stylelint/stylelint)** (that you can uncomment inside `postcss.config.js`)
- **[Offline-plugin](https://github.com/NekR/offline-plugin)**, **[favicons-webpack-plugin](https://github.com/jantimon/favicons-webpack-plugin)**,  **[webpack-manifest-plugin](https://github.com/danethurber/webpack-manifest-plugin)**, **[preload-webpack-plugin](https://github.com/GoogleChrome/preload-webpack-plugin)**, **[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)**, **[compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin)**, **[webpack-common-shake](https://github.com/indutny/webpack-common-shake)**.

#### Server:
- **[morgan](https://www.npmjs.com/package/morgan)** - request logger middleware.
- **[helmet](https://github.com/helmetjs/helmet)** - secure your Express app.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)** - cookie parsing middleware.
- **[body-parser](https://github.com/expressjs/body-parser)** - body parsing middleware
- **[compression](https://github.com/expressjs/compression)** -  compression middleware (gzip).
- **[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)** - JWT ~~for the win~~.

#### Other:
- **[Jest](https://facebook.github.io/jest/)** - awesome testing framework.
- [And more tools for building and testing...](https://github.com/Metnew/react-semantic.ui-starter/blob/master/package.json)

### Usage

#### How it works?

##### **[Most commonly asked questions are here.](/docs/faq.md)**

#####
##### ~~[Webpack configuration (not finished)](/docs/webpack.md)~~
##### [What's the magic behind `npm run dev`?](/docs/scripts.md)
##### [How i18n works?](/docs/i18n.md)
##### [Testing.](/docs/testing.md)
##### [Why this starter uses `react-semantic-ui`?](/docs/SUI.md)
##### [How does SSR work?](/docs/ssr.md)
##### ~~[Environment variables and configuration. (not finished)](/docs/env_vars.md)~~
##### ~~[Starter architecture and design. (not finished)](/docs/design.md)~~


#### Nearest future:
- CLI app
- Redux reducers/actions lazy-loading
- data fetching on server


#### Something very important:

> Have a question? Ask! :wink:

Any help is highly appreciated. PRs, issues, questions, enhancements are always welcome.

### Author
Vladimir Metnew <vladimirmetnew@gmail.com>

### LICENSE
MIT


### Goals
Small Intro from creator: I don't like any other starters/boilerplates/solutions, and that's why:
1. They are mostly unmaitained. Check the number of issues and PRs in other starter-kits, the average is 100-150 issues per repo. Noir is currently maintained. I use this setup for every React app I start.
2. They are outdated. Some starters use react-router@3.0, webpack@1, etc. Noir use only latest dependencies.
3. Custom code in internal tools. Some starters monkey-patch webpack compilers to achieve universality, add custom code, relies on unmaitained/outdated/too complex solutions. universality inside Noir achieved by very simple hack described here.
4. Trying to sell you a product. E.g: Our starter is so good that it can be deployed/build with our service in one click. That's not an OSS, guys.
5. Too much custom code. Hard to eject libraries from starter. Indeed, Noir is very modular and flexible.
6. Bad project structure. Noir follows Atarax. Atarax is a subset of recommendations for development with component-based(React) and flux-architectures(Redux) libraries.
7. No explanations how things really work. Just "Add your code, run `abracadabra` and project compiles.". Noir has a good docs.


### Cons
1. Project deploys new features as they are availiable. Probably, there will no be any major changes.
2. Probably, you'll move from version to version manually. Currently, there is no cli like `react-scripts` for Noir, but it's in progress :smiling_imp:
