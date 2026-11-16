import { Router } from 'express';
import { list, read, create, update, remove } from '../controllers/pizza.controller';
import queryHandler from '../middlewares/queryHandler.middleware';
import { isLogin, isAdmin } from '../middlewares/permissions.middleware';

const router = Router();

router.route('/')
    .get(queryHandler, list)
    .post(isAdmin, create);

router.route('/:id')
    .get(read)
    .put(isAdmin, update)
    .delete(isAdmin, remove);

export default router;