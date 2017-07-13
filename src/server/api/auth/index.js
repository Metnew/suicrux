import {Router} from 'express'
const router = Router()

// define the home page route
router.post('/', (req, res) => {
  res.json({token: 'nothing'})
})

export default router
