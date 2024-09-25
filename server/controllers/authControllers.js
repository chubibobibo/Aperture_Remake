import "express-async-errors";
import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";

import { UserModel } from "../models/UserSchema.js";

/** Register controller */
export const register = async (req, res) => {
  if (!req.body) {
    throw new ExpressError(
      "Something went wrong",
      res.status(StatusCodes.BAD_REQUEST)
    );
  }

  const newUser = await UserModel.create(req.body);
  if (!newUser) {
    throw new ExpressError(
      "User cannot be registered",
      res.status(StatusCodes.BAD_REQUEST)
    );
  }
  res.status(StatusCodes.OK).json({ message: "Registered new user", newUser });
};
