import { Router } from "express";
import { create, list, read, remove, update } from "../controllers/personnel.controller";
import { isAdminOrLead } from "../middlewares/permissions";

const router = Router();

// URL: /personnels

router.route("/").get(isAdminOrLead, list).post(isAdminOrLead, create);

// todo: check if lead is in the same dapertment with user. 
router.route("/:id").get(isAdminOrLead, read).put(isAdminOrLead, update).delete(isAdminOrLead, remove);

export default router;
