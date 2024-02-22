import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { updateAvatar } from "../controllers/site.controllers.js";
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

export default router;
