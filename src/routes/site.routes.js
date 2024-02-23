import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
  updateAvatar,
  updateCoverImage,
} from "../controllers/site.controllers.js";
import {
  getSiteData,
  updateSiteData,
} from "../controllers/site.controllers.js";

const router = express.Router();

router.get("/", getSiteData);
router.patch("/", verifyJWT, updateSiteData);
router.patch(
  "/update-avatar",
  verifyJWT,
  upload.single("avatar"),
  updateAvatar
);
router.patch(
  "/update-cover-image",
  verifyJWT,
  upload.single("coverImage"),
  updateCoverImage
);

export default router;
