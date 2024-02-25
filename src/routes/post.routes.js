import express from "express";
import { verifyJWT, authorizeAdmin } from "../middlewares/auth.middlewares.js";
import {
  addPost,
  getPosts,
  updatePost,
  deletePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.route("/").get(getPosts).post(verifyJWT, authorizeAdmin, addPost);
router
  .route("/:id")
  .patch(verifyJWT, authorizeAdmin, updatePost)
  .delete(verifyJWT, authorizeAdmin, deletePost);

export default router;
