import express from "express";
import { loginUser, logoutUser } from "../controllers/auth.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
