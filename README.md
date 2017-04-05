# Reatty

## Out-of-box:

![](https://github.com/Metnew/reatty/blob/gh-pages/screen.gif)

### DEMO: [You can find it here](https://metnew.github.io/reatty/)

> But Reatty requires at least mock DB, so gh-pages demo doesn't work without mock data

[![David](https://img.shields.io/david/Metnew/reatty.svg)]() [![David](https://img.shields.io/david/dev/Metnew/reatty.svg)]()
[![Known Vulnerabilities](https://snyk.io/test/github/metnew/reatty/badge.svg)](https://snyk.io/test/github/metnew/reatty)
[![Code Climate](https://codeclimate.com/github/Metnew/reatty/badges/gpa.svg)](https://codeclimate.com/github/Metnew/reatty)

### What is it?

Simple, but robust boilerplate.

### Why I need it?

You don't need to debug or write webpack configs for new project anymore.

Many templates currently aren't 100% ready - some setups have old dependencies versions (boilerplates with webpack v1.* is a good example), other templates are too small and you have to write setup code by yourself.

> Also, this setup isn't a "template-killer", it's just a robust setup that works.

#### Pros:

- You have already some code pre-written.
- Code was written following React&Redux concepts (containers/components).
- Latest dependencies.
- Few webpack chunks + App is ready for offline.

#### Cons:

- You have already some code pre-written. But you always can remove it :)
- No SSR (currently).

#### Includes:

- **[React](https://facebook.github.io/react/)** and **[Redux](http://redux.js.org/)**
- **[React-Router](https://github.com/ReactTraining/react-router)** + **[React-Router-Redux](https://github.com/reactjs/react-router-redux)**
- **[JSON-server](https://github.com/typicode/json-server)** for dev purposes
- **[Redux-thunk](https://github.com/gaearon/redux-thunk)**
- **[Fetch polyfill](https://github.com/github/fetch)**
- **[Semantic-ui-react](http://react.semantic-ui.com/)** and normalize.css for UI
- **[Store2](https://github.com/nbubna/store)** - LocalStorage access
- **[Webpack 2](https://webpack.js.org)**, babel (stage-0 + decorators), Redux-dev-tools
- **[Jest](https://facebook.github.io/jest/)** - awesome library for easy testing.

### Usage

```bash
git clone https://github.com/Metnew/reatty.git reatty
cd reatty && rm -rf .git  
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
```

It generates `dist` folder.

#### Test:

```bash
npm run test # run tests with Jest
```

> You can take a look at more advanced example of testing [here.](https://github.com/Metnew/react-scale)

## Folder structure:

```
│ Reatty
├── common - Your App
│   └── actions - application actions
│   ├── api - Services and XHR utils(also custom form validation, see InputComponent from components/common)
│   ├── components - components according to "Redux philosophy"
        └── common - common components of App, currently only wrapper for Semantic <Input /> component
│   ├── config - frontend config depending on REACT_WEBPACK_ENV
│   ├── containers - containers according to "Redux philosophy"
│   ├── reducers - application reducers
│   ├── routing - application routing
│   ├── styles - styles folder with scss vars, mixins, etc.
│   ├── index.jsx - project entry
│   ├── index.html
├── db // mock db
├── static - static assets(imgs, media)
├── webpack_config - Webpack configuration scripts
```

### Also:

PRs, questions and issues are welcome)

### LICENSE

MIT
