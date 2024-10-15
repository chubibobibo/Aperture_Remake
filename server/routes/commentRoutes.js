import express from "express";
import { addComment } from "../controllers/commentControllers.js";
import { addCommentValidation } from "../middleware/inputValidation.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/addComment/:id", isLoggedIn, addCommentValidation, addComment);

export default router;
