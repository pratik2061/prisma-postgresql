import {Router} from 'express'
import {createPost, deletePost, fetchPost, showPost, updatePost} from '../controller/PostController.js'
const router = Router()

router. post('/',createPost)
router.put('/:id',updatePost)
router.get('/',fetchPost)
router.get('/:id',showPost)
router.delete('/:id',deletePost)
export default router;