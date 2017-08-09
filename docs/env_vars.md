# Env vars

> if you don't know what is environment variables - [this link is for you](https://www.digitalocean.com/community/tutorials/how-to-read-and-set-environmental-and-shell-variables-on-a-linux-vps)

Environment variables are very important for configuration.
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
Because, if GA is added only after `DOMContentLoaded`, it saves page loading time.

#### `SENTRY_PUBLIC_DSN (default: false)`:
Similar to `GA_ID`, but for [Sentry](https://sentry.io).

#### `BASE_API (default: '/api/v1')`:
App uses this path for requests with relative urls

#### `APP_LANGUAGE (default: 'en')`:
Build app with this language. Check `/i18n` folder and **[i18n-webpack-plugin](https://github.com/webpack-contrib/i18n-webpack-plugin)**.  

#### `ANALYZE_BUNDLE (default: false)`:   
Run [webpack-bundle-analyzer]() after build.    

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
