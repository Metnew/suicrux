/**
 * @flow
 * @file
 */
import express from 'express'
import 'babel-polyfill'
//  polyfills
import fetch from 'isomorphic-fetch'
import FormData from 'form-data'
// import middlewares
import addMiddlewares from './middlewares'
import API from './api'
import SSR from './ssr'

global.fetch = fetch
global.window = {}
global.FormData = FormData

const app: express$Application = express()

// Add global middlewares
addMiddlewares(app)
// Add API
app.use(process.env.API_PREFIX, API)
// Add SSR
app.use(SSR)

export default app
