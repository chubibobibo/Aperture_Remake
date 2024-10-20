import express from "express";
const router = express.Router();

import { createPostValidation } from "../middleware/inputValidation.js";

import {
  createPost,
  deletePost,
  getAllPhotos,
  getSinglePhoto,
  getUserPhoto,
} from "../controllers/photoControllers.js";

import upload from "../middleware/multerMiddleware.js";
/** protect posting of new post */
import { isLoggedIn, isPostOwner } from "../middleware/authMiddleware.js";

/** GET ALL PHOTOS */
router.get("/allPhotos", getAllPhotos);

/** GET USER'S PHOTOS */
router.get("/userPhoto/:id", getUserPhoto);

/** GET SINGLE PHOTO */
router.get("/post/:id", getSinglePhoto);

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
/** DElETE POST */
router.delete("/deletePost/:id", isLoggedIn, isPostOwner, deletePost);

export default router;
