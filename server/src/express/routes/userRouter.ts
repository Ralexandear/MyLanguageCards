import Router from 'express'
import UserController from '../controllers/userController';
import { AuthMiddleware } from '../middleware/AuthMiddleware';
const router = Router()


router.get('/auth', AuthMiddleware, UserController.check)
router.post('/login', UserController.login)
router.post('/register', UserController.register)

export const userRouter = router;
export default userRouter;