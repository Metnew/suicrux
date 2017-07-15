import app from './express'
import API from './api'
import useSSR from './ssr'
// see src/server/index.js
const {PORT, BASE_API} = process.env
// Add API route
app.use(BASE_API, API)
// Add SSR handler
app.get('*', useSSR)
// Start server
app.listen(PORT, () => {
  console.log(`SSR ON PORT ${httpPort}! SSR!`)
})
