import Router from 'express'
import userRouter from './userRouter';
import vocabularyRouter from './vocabularyRouter';

const router = Router()

router.use('/user', userRouter)
// router.use('/vocabulary', vocabularyRouter)

module.exports = router
export default router;