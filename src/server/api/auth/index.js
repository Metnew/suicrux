import {Router} from 'express'
import jwt from 'jsonwebtoken'
import chalk from 'chalk'
// import validator from 'validator'
// {isLength, trim, isAlphanumeric, escape}
const router = Router()

// define the home page route
router.post('/', (req, res) => {
  // const {username, password} = req.body
  // const usernameValidated = validator.isLength(0, 36).is
  // const passwordValidated =
  const data = {username: 'cool_username_for_testing'}
  jwt.sign(data, process.env.JWT_SECRET, (err, token) => {
    if (err) {
      throw new Error(
        `Cant create JWT token based on input data: ${JSON.stringify(data)}`,
        err
      )
    }
    console.log(chalk.yellow(`Generated token for user: ${data.username}`))
    res.json({token})
  })
})

export default router
