# Env vars

### Webpack:

#### `ANALYZE_BUNDLE (default: false)`:   
Run `webpack-bundle-analyzer` after build done.

### Client:

#### `GA_ID (default:false)`:
Your Google analytics ID.
If set, react-ga will be initialized inside `<App>` container on `componentDidMount()` event.

#### `SENTRY_PUBLIC_DSN (default: false)`:
Similar to `GA_ID`, but for [Sentry](https://sentry.io).

### Server&Client:

#### `BROWSER`:
Your environment. `true` - browser, `false` - Node.

#### `BASE_API (default: '/api/v1')`:
Prefix of server API. This prefix is used by both client and server.    

### Server:

#### `HTTP_PORT (default: 3000)`:
Port on which your app will run.

#### `JWT_SECRET (default: 'secret')`:
Secret key for jwt signing.

#### `BASE_API (default: '/api/v1')`:
App uses this path for requests with relative urls   

#### `SENTRY_DSN (default: false)`:
Sentry full(private) DSN.
Error handling with [Sentry](https://sentry.io) for server.    

#### `CLIENT_DIST_PATH`: (default: `/dist/client`).
Path where server search for a **built** app.   
