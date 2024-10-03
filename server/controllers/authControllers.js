import "express-async-errors";
import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";

import { UserModel } from "../models/UserSchema.js";

/** REGISTER CONTROLLER */
export const register = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("Something went wrong", StatusCodes.BAD_REQUEST);
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
      StatusCodes.BAD_REQUEST
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

/** GET LOGGED USER */
export const getLoggedUser = async (req, res) => {
  if (!req.user) {
    res.status(StatusCodes.OK).json({ message: "No logged user" });
  } else {
    const foundLoggedUser = await UserModel.findById(req.user._id);
    console.log(foundLoggedUser);
    res
      .status(StatusCodes.OK)
      .json({ message: "Logged User:", foundLoggedUser });
  }
};

/** LOGOUT USER */
/** @logout uses req.logout from passport and accepts a  callback for errors. Then handles the error by  returning it to the next middleware or request */
export const logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res
      .status(StatusCodes.OK)
      .json({ message: "User successfully logged out " });
  });
};
