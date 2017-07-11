import {Router} from 'express'
const router = Router()

// define the home page route
router.get('/', (req, res) => {
  res.json({token: 'nothing'})
})

export default router
