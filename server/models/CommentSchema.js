import mongoose from "mongoose";
import { UserModel } from "./UserSchema.js";

const { Schema } = mongoose;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
  },

  rating: {
    type: Number,
    required: true,
  },
});

export const CommentModel = mongoose.model("CommentModel", CommentSchema);
