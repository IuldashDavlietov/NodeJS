import { Router } from 'express';
import { list, read, create, update, remove } from '../controllers/order.controller';
import queryHandler from '../middlewares/queryHandler.middleware';
import { isLogin, isAdmin } from '../middlewares/permissions.middleware';

const router = Router();
router.use(isLogin);

router.route('/')
    .get(queryHandler, list)
    .post(create);

router.route('/:id')
    .get(read)
    .put(isAdmin, update)
    .delete(isAdmin, remove);

export default router;