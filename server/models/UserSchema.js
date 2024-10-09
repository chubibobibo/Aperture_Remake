import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { roles } from "../utils/roles.js";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },

    firstName: {
      type: String,
      required: true,
    },

    lastName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(roles),
    },

    avatarUrl: {
      type: String,
    },

    avatarId: {
      type: String,
    },
  },
  { timestamps: true }
);
/** @passportLocalMongoose as plugin will allow the use of different methods for authenticating a user. This creates a unique password */
UserSchema.plugin(passportLocalMongoose);
export const UserModel = mongoose.model("UserModel", UserSchema);
