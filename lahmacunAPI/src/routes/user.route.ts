import { Router } from 'express';
import { list, read, create, update, remove } from '../controllers/user.controller';
import queryHandler from '../middlewares/queryHandler.middleware';
import { isLogin, isAdmin } from '../middlewares/permissions.middleware';

const router = Router();

router.route('/')
    .get(isAdmin, queryHandler, list)
    .post(create);

router.route('/:id')
    .get(isLogin, read)
    .put(isLogin, update)
    .delete(isAdmin, remove);

export default router;