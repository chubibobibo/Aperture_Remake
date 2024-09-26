import "express-async-errors";
import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";

import { UserModel } from "../models/UserSchema.js";

/** REGISTER CONTROLLER */
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
  const { username, email, password, firstName, lastName } = req.body;
  const isAdmin = (await UserModel.countDocuments()) === 0;
  req.body.role = isAdmin ? "admin" : "user";
  const newUser = await UserModel.create({
    username: username,
    email: email,
    firstName: firstName,
    lastName: lastName,
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

/** LOGIN CONTROLLER */
export const login = async (req, res) => {
  if (!req.body) {
    throw new ExpressError(
      "No data received",
      res.status(StatusCodes.BAD_REQUEST)
    );
  }

  const foundUser = await UserModel.findOne({ username: req.body.username });
  if (!foundUser) {
    throw new ExpressError("No user found", res.status(StatusCodes.NOT_FOUND));
  }
  res.status(StatusCodes.OK).json({ message: "User found", foundUser });
};
