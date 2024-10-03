import mongoose from "mongoose";

const { Schema } = mongoose();

const PhotoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },

  photoUrl: {
    type: String,
    required: true,
  },

  photoId: {
    type: String,
  },

  Description: {
    type: String,
    required: true,
  },

  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CommentSchema",
  },
});

export const PhotoModel = mongoose.model("PhotoModel", PhotoSchema);
