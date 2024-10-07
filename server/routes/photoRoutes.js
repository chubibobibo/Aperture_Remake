import express from "express";
const router = express.Router();

import { createPostValidation } from "../middleware/inputValidation.js";

import { createPost } from "../controllers/photoControllers.js";

import upload from "../middleware/multerMiddleware.js";
/** protect posting of new post */
import { isLoggedIn } from "../middleware/authMiddleware.js";

/** CREATE POST */
/** @single single upload from cloudinary API */
/** @photoUrl filename of the image from the createPost forms */
router.post(
  "/createPost",
  isLoggedIn,
  upload.single("photoUrl"),
  createPostValidation,
  createPost
);

export default router;
