import "express-async-errors";
import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";

import { UserModel } from "../models/UserSchema.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

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
  if (!req.user) {
    console.log("No logged user");
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

/** UPDATE USER */
/** req.file created by multer containing the formData and the image */
export const updateUser = async (req, res) => {
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "aperture_remake",
    });
    console.log(response.public_id);
    await fs.unlink(req.file.path); // deletes photo in public/uploads

    req.body.avatarUrl = response.secure_url;
    req.body.avatarId = response.public_id;
  }

  const { id } = req.params;
  const user = await UserModel.findById(id);
  if (!user) {
    throw new ExpressError("User does not exist", StatusCodes.NOT_FOUND);
  }

  const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedUser) {
    throw new ExpressError("Cannot update user", StatusCodes.BAD_REQUEST);
  }

  if (user.avatarId) {
    await cloudinary.v2.uploader.destroy(user.avatarId);
  }
  res
    .status(StatusCodes.OK)
    .json({ message: "User successfully updated", updatedUser });
};

/** GET USER */
export const getUser = async (req, res) => {
  const { id } = req.params;
  const foundUser = await UserModel.findById(id);
  if (!foundUser) {
    throw new ExpressError("Cannot find user", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ message: "user found", foundUser });
};
