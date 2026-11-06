import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/department.controller";

const router = Router();

// URL: /departments

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).delete(remove);

export default router;
