import express from "express";
import { getMe, login, logout, register } from "../controllers/authContoller.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/logout", logout);
router.get("/auth/me", protect, getMe);

export default router;