import express from "express";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middlewares.js";
import {
  getIcons,
  addIcon,
  updateIcon,
  deleteIcon,
} from "../controllers/icon.controllers.js";

const router = express.Router();

router
  .route("/")
  .get(verifyJWT, authorizeAdmin, getIcons)
  .post(verifyJWT, authorizeAdmin, addIcon);
router
  .route("/:id")
  .patch(verifyJWT, authorizeAdmin, updateIcon)
  .delete(verifyJWT, authorizeAdmin, deleteIcon);

export default router;
