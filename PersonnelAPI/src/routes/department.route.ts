import { Router } from "express";
import { create, list, read, remove, update, personnels } from "../controllers/department.controller";
import { isLogin, isAdmin } from "../middlewares/permissions";


const router = Router();

// URL: /departments

router.route("/").get(isLogin, list).post(isAdmin, create);

router.route("/:id").get(isLogin, read).put(isAdmin, update).delete(isAdmin, remove);

router.get('/:id/personnels',personnels)

export default router;

