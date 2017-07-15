// Express-related stuff
import express from 'express'
import expressHelmet from 'helmet'
import compression from 'compression'
import path from 'path'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
// Application-related stuff
// Do you remember that we use webpack aliases provided by cool babel plugin in .babelrc
import {JWT_TOKEN} from 'common/api'
//
const language = process.env.APP_LANGUAGE || 'en'
const distPath = `../../../dist/${language}`
const app = express()
// add express stuff
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(
  express.static(path.join(__dirname, distPath), {
    // don't use index.html inside /dist dir
    index: false
  })
)
app.disable('x-powered-by')
app.use(expressHelmet())

// Auth-related middleware, check that user is logged in and token is valid
app.use((req, res, next) => {
  //  Of course, you can make auth with jwt or cookies or session only
  //  It's a starter project and I implemented a hardcoded solution
  const token = req.cookies[JWT_TOKEN]
  const isLoggedIn = token === 'nothing'
  console.log(`USER IS LOGGED IN: ${isLoggedIn ? 'YES': 'NO'}`)
  req.user = {
    token,
    isLoggedIn
  }
  next()
})

export default app
