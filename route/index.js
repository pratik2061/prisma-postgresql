import {Router} from 'express'
import UserRoutes from './UserRoutes.js'
import postRoutes from './postRoutes.js'

const router = Router()
router.use('/api/user',UserRoutes)

//for post routes
router.use('/api/post',postRoutes)

export default router