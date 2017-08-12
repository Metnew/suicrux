# Env vars

## Guide isn't finished yet


> if you don't know what is environment variables - [this link is for you](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)

Environment variables are very important for configuration. Some variables are used for webpack configuration, other variables are used in code (using `webpack.DefinePlugin`).

## Frontend

#### `GA_ID (default:false)`:
Your Google analytics ID.    
If set, google-analytics will be added on `<App>` container's `componentDidMount()` event.
```js
if (process.env.GA_ID) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = true
  script.crossorigin = 'anonymous'
  script.onload = () => {
    window.ga =
      window.ga ||
      function () {
        (ga.q = ga.q || []).push(arguments)
      }
    ga.l = Number(new Date())
    ga('create', process.env.GA_ID, 'auto')
    ga('send', 'pageview')
  }
  script.src = 'https://www.google-analytics.com/analytics.js'
  document.body.appendChild(script)
}
```
##### Why not to add GA in index.html?
Because, it saves loading time.

#### `SENTRY_PUBLIC_DSN (default: false)`:
Similar to `GA_ID`, but for [Sentry](https://sentry.io).

#### `BASE_API (default: '/api/v1')`:
This is the prefix of your server API. This prefix is used by both client and server.    
Server inits API based on this prefix in `src/server/server.js`:
```js
// ...
const {BASE_API, PORT} = process.env
// Add API route
app.use(BASE_API, API)
// ...
```

Client makes all requests to server using this prefix:
```js
// ...
// Check that req url is relative and request was sent to our domain
if (url.match(/^https?:\/\//gi) > -1) {
  const token = getLocalToken()
  if (token) {
    defaults.headers.Authorization = `JWT ${token}`
  }
  url = process.env.BASE_API + url
}
// ...
```

#### `APP_LANGUAGE (default: 'en')`:
Variable is used by webpack for build configuration, but you still have access to it in code. It might be useful to know app language for simple localization or other tasks.

## Server:

#### `PORT (default: 4000)`:
Port on which your app will run.

#### `JWT_SECRET (default: 'secret')`:
Secret key for jwt signing.
**CAUTION:** always specify this option, don't use default fallback in production!

#### `BASE_API (default: '/api/v1')`:
App uses this path for requests with relative urls   

#### `SENTRY_DSN (default: false)`:
NOT IMPLEMENTED YET!
Your Sentry full(private) DSN for server.
Error handling with [Sentry](https://sentry.io) for server.    

#### `APP_LANGUAGE (default: false)`:
Language of your app.    

#### `DIST_PATH`: (default: `/dist/client/<APP_LANGUAGE>`).
Path where server search for the index.html of your **built** app.   
