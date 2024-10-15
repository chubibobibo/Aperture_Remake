import "express-async-errors";
import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";
import { CommentModel } from "../models/CommentSchema.js";
import { PhotoModel } from "../models/PhotoSchema.js";

/** Id from params is required to find the specific post where the comment will be pushed. */
export const addComment = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw new ExpressError("No data", StatusCodes.NOT_FOUND);
  }
  if (!req.user) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  } else {
    req.body.author = req.user.id;
  }

  const newComment = await CommentModel.create(req.body);
  if (!newComment) {
    throw new ExpressError("Cannot post comment", StatusCodes.BAD_REQUEST);
  }

  const foundPost = await PhotoModel.findById(id);
  if (!foundPost) {
    throw new ExpressError("Post does not exist", StatusCodes.NOT_FOUND);
  }

  foundPost.comment.push(newComment._id);
  foundPost.save();
  res
    .status(StatusCodes.OK)
    .json({ message: "New comment created", newComment });
};

/** getAllComments for a specific post */
// export const getComment = async(req, res) => {
//     const {id} = req.params
//     const specificComment = await CommentModel.find({})
// };
