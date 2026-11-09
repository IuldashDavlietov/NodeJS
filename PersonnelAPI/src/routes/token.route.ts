import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/token.controller";
import { isAdmin } from "../middlewares/permissions";
const router = Router();

// URL: /tokens

router.use(isAdmin) // simply applied every route in router this file.

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).delete(remove);

export default router;
