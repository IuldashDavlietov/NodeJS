import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/personnel.controller";

const router = Router();

// URL: /personnels

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).delete(remove);

export default router;