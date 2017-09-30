import {Router} from 'express'
import auth from './auth'
import links from './links.json'
const router = Router()

router.use('/auth', auth)
router.get('/links', (req, res) => {
	res.send(links)
})

export default router
