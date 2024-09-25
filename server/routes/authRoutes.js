import express from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";

const router = express.Router();

import { register, login } from "../controllers/authControllers.js";

router.post("/register", register);

/** @authenticate passport method that authenticates using the local strategy  */
/** @user if auth is successful this will be the user obj */
/** @info will contain err messages */
router.post("/login", (req, res, next) => {
  // if there is an err during authentication, it is passed to the next middleware or route
  passport.authenticate("local", (err, user, info) => {
    // auth error
    if (err) {
      return next(err);
    }
    // handling auth failure (no user)
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: info.message || "Invalid username or password",
      });
    }
    // authenticated user
    /** @user once auth is successful. user is serialized and stores user's id in session (user stays logged in) */
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return login(req, res);
    });
  })(req, res, next);
});

export default router;
