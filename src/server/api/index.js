import {Router} from 'express'
import links from './links'
const router = Router()

router.get('/links', (req, res) => res.send(links))

export default router
