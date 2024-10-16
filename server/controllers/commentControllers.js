import "express-async-errors";
import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";
import { CommentModel } from "../models/CommentSchema.js";
import { PhotoModel } from "../models/PhotoSchema.js";

/** Id from params is required to find the specific post where the comment will be pushed. */

/** @foundPost request to search the specific photo post in order to push the created comment into the comment array of PhotoModel */
/** CREATING COMMENTS AND RATING */


export const addComment = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw new ExpressError("No data", StatusCodes.NOT_FOUND);
  }
  if (!req.user) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  } else {

    req.body.author = req.user.id; //adds the logged user's id as author of the comment

  }

  const newComment = await CommentModel.create(req.body);
  if (!newComment) {
    throw new ExpressError("Cannot post comment", StatusCodes.BAD_REQUEST);
  }

  const foundPost = await PhotoModel.findById(id);
  if (!foundPost) {
    throw new ExpressError("Post does not exist", StatusCodes.NOT_FOUND);
  }

  await foundPost.comment.push(newComment._id);
  await foundPost.save();

  res
    .status(StatusCodes.OK)
    .json({ message: "New comment created", newComment });
};


/** UPDATING COMMENTS AND RATINGS */

export const updateComment = async (req, res) => {
  const { id } = req.params;
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  console.log(req.body);
  const updatedComment = await CommentModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedComment) {
    throw new ExpressError("Cannot update comment", StatusCodes.BAD_REQUEST);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "Comment updated", updatedComment });
};

/** DELETING COMMENTS */
export const deleteComment = async (req, res) => {
  const { photoId, commentId } = req.params;
  const foundPhoto = await PhotoModel.findByIdAndUpdate(photoId, {
    $pull: { comment: commentId },
  });
  if (!foundPhoto) {
    throw new ExpressError("Post not found", StatusCodes.NOT_FOUND);
  }
  await CommentModel.findByIdAndDelete(commentId, { new: true });
  res.status(StatusCodes.OK).json({ message: "Comment deleted" });
};

