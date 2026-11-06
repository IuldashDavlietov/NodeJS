import { Router } from "express";
import { login, logout } from "../controllers/auth.controller";

const router = Router();

// URL: /auth

router.post("/login", login);
router.all("/logout", logout);

export default router;
