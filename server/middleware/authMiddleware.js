import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";
import { CommentModel } from "../models/CommentSchema.js";

/** @isLoggedIn middleware to protect certain routes */
/** @authenticated method from passportJS to authenticate  */
export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  } else {
    next();
  }
};

export const isAuthor = async (req, res, next) => {
  /** @commentId id that we will use to look for the specific comment to access it's author */
  /** @author variable that contains a boolean that will indicate if req.user._id is equals the author of the comment */

  const { commentId } = req.params;
  if (!req.body) {
    throw new ExpressError("User not logged in", StatusCodes.UNAUTHORIZED);
  }
  const foundComment = await CommentModel.findById(commentId);
  // console.log(req.user._id);
  // console.log(foundComment.author);
  const author = req.user._id.toString() === foundComment.author.toString();
  console.log(author);
  if (!author) {
    throw new ExpressError("User is not authorized", StatusCodes.UNAUTHORIZED);
  } else {
    next();
  }
};
