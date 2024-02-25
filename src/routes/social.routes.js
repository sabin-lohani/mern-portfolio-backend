import express from "express";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middlewares.js";
import {
  getSocials,
  addSocial,
  updateSocial,
  deleteSocial,
} from "../controllers/social.controllers.js";

const router = express.Router();

router
  .route("/")
  .get(verifyJWT, authorizeAdmin, getSocials)
  .post(verifyJWT, authorizeAdmin, addSocial);
router
  .route("/:id")
  .patch(verifyJWT, authorizeAdmin, updateSocial)
  .delete(verifyJWT, authorizeAdmin, deleteSocial);

export default router;
