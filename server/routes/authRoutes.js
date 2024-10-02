import express from "express";
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import {
  registerValidation,
  loginValidation,
} from "../middleware/authValidation.js";

import {
  register,
  login,
  getLoggedUser,
} from "../controllers/authControllers.js";
import { rateLimit } from "express-rate-limit";

const router = express.Router();

/** API LIMITER */
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: "Too many login attempts. Try again in 15 minutes ",
});

/** GET LOGGED USER */
router.get("/getLoggedUser", getLoggedUser);

/** REGISTER ROUTE */
router.post("/register", registerValidation, register);

/** LOGIN ROUTE */
/** @authenticate passport method that authenticates using the local strategy  */
/** @user if auth is successful this will be the user obj */
/** @info will contain err messages */
router.post("/login", limiter, loginValidation, (req, res, next) => {
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
