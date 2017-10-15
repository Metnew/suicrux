# React-Semantic.UI-Starter

## Usage

### Install:
```bash
# clone repo without full git history
git clone --depth=1 https://github.com/rajchourasia/react-semantic.ui-starter.git
cd react-semantic.ui-starter
# You can remove .git folder if you don't want to pull new features or need your own repo
# to remove folder run: rm -rf .git
# install dependencies
npm install
```

### Development:

```bash
npm run dev # run both frontend and server in dev mode(using `concurrently`)

npm run frontend_dev # run frontend in dev mode.

npm run server_dev  # run server in dev mode
```

### Build:

```bash
npm run build # build both frontend and server

npm run frontend_build # build frontend

npm run server_build # build server
```

### Run:
```bash
# npm run build - at first build app.
npm run start # run app. You need already built app for this!
# then visit localhost:4000 in your browser, if you didn't specify PORT env var
```

### Deploy:
If you use **[now](https://github.com/zeit/now)** on OSS(free) plan - you will run out of memory on `npm run build`. I recommend you to disable some non-critical plugins (ModuleConcatenationPlugin, SriPlugin, FaviconsWebpackPlugin). [Demo that was deployed to "now"](https://reatty.now.sh/)

### Test:

```bash
npm run test # run tests with Jest, BASE_API env var is required!
```

### Lint:

`eslint-loader` is already included in webpack, but if you want to lint code without webpack:

```bash
npm run lint:styles  # lint styles with Stylelint
npm run lint:scripts # lint scripts with ESlint
```

### Docs:

Powered by ESDoc.

```bash
npm run docs # generate docs and `serve`
```

### ENV vars:
ENV vars are **very important** for configuration.

#### Client ENV vars:
`GA_ID`: Your Google analytics ID.      
`BASE_API`: `/api/v1` by default. App uses this path for requests with relative urls      
`SENTRY_PUBLIC_DSN`: Your Sentry public DSN.     
`APP_LANGUAGE`: `en` by default. Build app with this language. Check `/i18n` folder and **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**.      
`ANALYZE_BUNDLE`: Run webpack-bundle-analyzer after build.     

#### Server ENV vars:
`PORT`: Port on which your app run.          
`BASE_API`: App uses this path for requests with relative urls.    
`SENTRY_PUBLIC_DSN`: Your Sentry public DSN.      
`SENTRY_DSN`: Your Sentry full(private) DSN for server-side error handling.    
`APP_LANGUAGE`: Language of your app.     
`DIST_PATH`: (by default: `/dist/client/<APP_LANGUAGE>`). Path where server search for the index.html of your **built** app.    
