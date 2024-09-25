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

  /** @setPassword passport method to set a new unique password by accessing the newly created instance of UserModel */
  /** @isAdmin checks if number of entries in the UserModel is 0 then use it as ternary operator */
  /** destructure req.body to obtain each property */
  const { username, email, password } = req.body;
  const isAdmin = (await UserModel.countDocuments()) === 0;
  req.body.role = isAdmin ? "admin" : "user";
  const newUser = await UserModel.create({
    username: username,
    email: email,
    role: req.body.role,
  });
  await newUser.setPassword(password);
  await newUser.save();

  if (!newUser) {
    throw new ExpressError(
      "User cannot be registered",
      res.status(StatusCodes.BAD_REQUEST)
    );
  }
  res.status(StatusCodes.OK).json({ message: "Registered new user", newUser });
};
