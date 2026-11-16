import { Router } from "express";
import { login, logout, refresh } from "../controllers/auth.controller";

const router = Router();
export default router;

router.post('/login', login)
router.get('/logout', logout)
router.post('/refresh', refresh)