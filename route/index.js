import {Router} from 'express'
import UserRoutes from './UserRoutes.js'
import postRoutes from './postRoutes.js'
import commentRoutes from './commentRoues.js'

const router = Router()
router.use('/api/user',UserRoutes)

//for post routes
router.use('/api/post',postRoutes)

//for comment routes
router.use('/api/comment',commentRoutes)
export default router