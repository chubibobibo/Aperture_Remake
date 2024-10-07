import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";

/** @isLoggedIn middleware to protect certain routes */
/** @authenticated method from passportJS to authenticate  */
export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw new ExpressError("User is not logged in", StatusCodes.UNAUTHORIZED);
  } else {
    next();
  }
};
