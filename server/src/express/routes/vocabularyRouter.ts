import Router from 'express'
import VocabularyController from '../controllers/vocabularyConroller';
const router = Router()

router.post('/create', VocabularyController.create)
// router.patch('/edit', VocabularyController)
router.get('list', )
// router.post('/register', UserController.check)

export const vocabularyRouter = router;
export default vocabularyRouter;