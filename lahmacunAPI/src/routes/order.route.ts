import { Router } from "express";
import { list, read, create, update, remove } from '../controllers/order.controller'

const router = Router();
export default router;

router.route("/")
    .get(list)
    .post(create);

router.route('/:id')
    .get(read)
    .put(update)
    .delete(remove)