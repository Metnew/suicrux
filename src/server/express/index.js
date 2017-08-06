// Express-related stuff
import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
// Application-related stuff
import {JWT_TOKEN} from 'common/api'

const {DIST_PATH, JWT_SECRET} = process.env
const app = express()
// add express stuff
app.use(helmet())
app.use(compression())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(
  express.static(DIST_PATH, {
    // don't use index.html inside /dist dir
    index: false
  })
)
app.use(bodyParser.json())
app.disable('x-powered-by')

// Auth-related middleware, check that user is logged in and token is valid
app.use((req, res, next) => {
  req.user = {}
  const token = req.cookies[JWT_TOKEN]
  if (!token) {
    return next()
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(chalk.red('CANT DECODE JWT TOKEN!', err))
    } else {
      req.user = {
        ...decoded,
        token,
        isLoggedIn: true
      }
    }
    console.log(
      chalk.blue(`USER IS LOGGED IN: ${req.user.isLoggedIn ? 'YES' : 'NO'}`)
    )
    next()
  })
})

export default app
