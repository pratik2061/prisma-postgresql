import {Router} from 'express'
import {createUser, deleteUser, fetchUser, showUser, updateUser} from '../controller/UserController.js'
const router = Router()

router. post('/',createUser)
router.put('/:id',updateUser)
router.get('/',fetchUser)
router.get('/:id',showUser)
router.delete('/:id',deleteUser)
export default router;