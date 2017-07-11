// Express stuff
import express from 'express'
import expressHelmet from 'helmet'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import cookieParser from 'cookie-parser'

const language = process.env.APP_LANGUAGE || 'en'
const distPath = `../../../dist/${language}`
const app = express()
// add express stuff
app.use(compression())
app.use(cookieParser())
app.use(
  express.static(path.join(__dirname, distPath), {
    // don't use index.html inside /dist dir
    index: false
  })
)
app.disable('x-powered-by')
app.use(expressHelmet())


export default app
