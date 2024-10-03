import mongoose from "mongoose";

const { Schema } = moongoose;

const CommentSchema = new Schema({
  body: {
    type: String,
    required: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserSchema",
  },

  rating: {
    type: Number,
    required: true,
  },
});

export const CommentModel = mongoose.model("CommentModel", CommentSchema);
