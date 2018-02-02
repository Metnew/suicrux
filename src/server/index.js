/**
 * @flow
 * @file
 */
import express from 'express'
import 'babel-polyfill'
//  polyfills
import fetch from 'isomorphic-fetch'
// import middlewares
import addMiddlewares from './middlewares'
import API from './api'
import SSR from './ssr'

global.fetch = fetch

const app: express$Application = express()

// Add global middlewares
addMiddlewares(app)
// Add API
app.use('/api', API)
// Add SSR
app.use(SSR)

export default app
