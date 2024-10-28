import { UserModel } from "./UserSchema.js";
import { CommentModel } from "./CommentSchema.js";
import mongoose from "mongoose";

const { Schema } = mongoose;

const PhotoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: UserModel,
    },

    photoUrl: {
      type: String,
      required: true,
    },

    photoId: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    /** @comment an array of ObjectIds from the comment schema*/
    comment: {
      type: [Schema.Types.ObjectId],
      ref: CommentModel,
    },

    photoLocation: {
      type: String,
      required: true,
    },

    photoCoords: {
      type: [Number],
    },
  },
  { timestamps: true }
);

export const PhotoModel = mongoose.model("PhotoModel", PhotoSchema);
