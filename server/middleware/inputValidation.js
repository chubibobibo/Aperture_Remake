import { body, param, validationResult } from "express-validator";
import { UserModel } from "../models/UserSchema.js";
import { ExpressError } from "../errorHandler/ExpressError.js";
import mongoose from "mongoose";
import { StatusCodes } from "http-status-codes";

//create a function that will handle the error
//This function will accept an array (validateValues) of values to be validated.
//then this function will return the array we passed as an argument and an error response
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req); //this returns all available errors based on the validation provided when checking the incoming request.
      //check if the errors array is not empty meaning there errors.
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((allErrors) => allErrors.msg); //turns the errors from the validationResult into array then mapped it to access the msg key for every item in the original array, then populate the created array with that.
        throw new ExpressError(errorMessages); //use the custom error that we created and pass the errorMessages that we mapped instead of a string.
      }
      next();
    },
  ];
};

/** INPUT VALIDATION FOR REGISTER INPUT */

export const registerValidation = withValidationErrors([
  body("username")
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Username must not be less than 4 characters"),
  body("firstName")
    .notEmpty()
    .withMessage("First name cannot be empty")
    .isLength({ min: 4 })
    .withMessage("First name must not be less than 4 characters"),
  body("lastName")
    .notEmpty()
    .withMessage("Last name cannot be empty")
    .isLength({ min: 4 })
    .withMessage("Last name must not be less than 4 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Email should be valid")
    .custom(async (email) => {
      const foundEmail = await UserModel.findOne({ email: email });
      if (foundEmail) {
        throw new ExpressError("Email is already in use");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be more than 8 characters"),
]);

/** INPUT VALIDATION FOR LOGIN INPUT */
export const loginValidation = withValidationErrors([
  body("username").notEmpty().withMessage("Username cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),
]);

/** INPUT VALIDATION FRO CREATE POST */
export const createPostValidation = withValidationErrors([
  body("title").notEmpty().withMessage("Title cannot be empty"),
  // body("photoUrl").notEmpty().withMessage("You need to post a photo"),
  body("description")
    .notEmpty()
    .withMessage("description cannot be empty")
    .isLength({ min: 10, max: 200 })
    .withMessage(
      "Description should be at least 10 characters and not more than 200 characters"
    ),
  // body("createdBy")
  //   .notEmpty()
  //   .withMessage("createdBy property cannot be empty.")
  //   .custom(async (createdById) => {
  //     const validId = mongoose.Types.ObjectId.isValid(createdById);
  //     if (!validId) {
  //       throw new ExpressError(
  //         "createdBy property is not a valid mongoId",
  //         StatusCodes.BAD_REQUEST
  //       );
  //     }
  //   }),
]);
