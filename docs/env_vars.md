# Env vars

## Guide isn't finished yet


> if you don't know what is environment variables - [this link is for you](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)

Environment variables are very important for configuration. Some variables are used for webpack configuration, other variables are used in code (using `webpack.DefinePlugin`).

## Frontend

#### `GA_ID (default:false)`:
Your Google analytics ID.    
If set, react-ga will be initialized inside `<App>` container on `componentDidMount()` event.

#### `SENTRY_PUBLIC_DSN (default: false)`:
Similar to `GA_ID`, but for [Sentry](https://sentry.io).
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
  script.src = '<url-too-sentry-script>'
  document.body.appendChild(script)
```

#### `BASE_API (default: '/api/v1')`:
Prefix of server API. This prefix is used by both client and server.    
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
