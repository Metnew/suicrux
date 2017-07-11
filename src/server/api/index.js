import {Router} from 'express'
import auth from './auth'
const router = Router()

// define the home page route
router.use('/auth', auth)

export default router
