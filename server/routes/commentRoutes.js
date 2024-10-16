import express from "express";

import {
  addComment,
  deleteComment,
  updateComment,
} from "../controllers/commentControllers.js";
import { addCommentValidation } from "../middleware/inputValidation.js";
import { isLoggedIn, isAuthor } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/addComment/:id", isLoggedIn, addCommentValidation, addComment);
router.patch(
  "/updateComment/:id",
  isLoggedIn,
  addCommentValidation,
  updateComment
);

router.delete(
  "/deleteComment/:photoId/:commentId",
  isLoggedIn,
  isAuthor,
  deleteComment
);


export default router;
