import "express-async-errors";
import { ExpressError } from "../errorHandler/ExpressError.js";
import { StatusCodes } from "http-status-codes";

/** @promises file system is needed to delete images in the public folder */
/** @response uses cloudinary API to upload to it's server the image from forms (req.file.path) then returns a secure link that will be saved in the database. */
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { PhotoModel } from "../models/PhotoSchema.js";

/** CREATING NEW POST */
export const createPost = async (req, res) => {
  console.log(req.body);
  if (!req.body) {
    throw new ExpressError("No data received", StatusCodes.BAD_REQUEST);
  }
  console.log(req.file);

  /** @obj photoUrl, photoId photo properties of the new instance of the new post. assigning value to them using the response from cloudinary */
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "aperture_remake",
    });
    console.log(response);
    await fs.unlink(req.file.path); // removes the image file in the multer storage
    req.body.photoUrl = response.secure_url;
    req.body.photoId = response.public_id;
    req.body.createdBy = req.user.id;
  }

  const newPhoto = await PhotoModel.create(req.body);
  if (!newPhoto) {
    throw new ExpressError("Cannot post your photo", StatusCodes.BAD_REQUEST);
  }

  res.status(StatusCodes.OK).json({ message: "Post created", newPhoto });
};

/** GET ALL PHOTOS */
export const getAllPhotos = async (req, res) => {
  const allPhotos = await PhotoModel.find({}).populate("createdBy");
  if (!allPhotos) {
    res.status(StatusCodes.OK).json({ message: "There are no images to show" });
  } else {
    res.status(StatusCodes.OK).json({ message: "All photos", allPhotos });
  }
};

/** GET SINGLE PHOTO */
export const getSinglePhoto = async (req, res) => {
  const { id } = req.params;
  const foundPhoto = await PhotoModel.findById(id).populate("createdBy");
  if (!foundPhoto) {
    throw new ExpressError("Cannot find that photo", StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ message: "Found photo", foundPhoto });
};
