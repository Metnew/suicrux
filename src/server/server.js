import app from './express'
import API from './api'
import useSSR from './ssr'

const httpPort = process.env.PORT || 3000

// add handler for non-static requests
app.use('/api/v1', API)
// SSR
app.get('*', useSSR)

app.listen(httpPort, () => {
  console.log(`SSR ON PORT ${httpPort}! SSR!`)
})
