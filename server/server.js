import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";

import authRoutes from "./routes/authRoutes.js";
import passport from "passport";
import { UserModel } from "./models/UserSchema.js";

const app = express();

/** middleware function parses requests with json payloads */
app.use(express.json());
app.use(cors());

/** database connection */
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_DB_URL);
}

/** Express sessions used with passportJS */
/** @store session store use to prevent memory leaks */
/** @sessionConfig uses store (mongoStore) as session storage and will be used as config when session is instantiated */
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_DB_URL,
  secret: process.env.MONGO_SECRET,
  touchAfter: 24 * 60 * 60, // interval between session update
});

store.on("error", (e) => {
  console.log("Session error");
});

app.set("trust proxy", 1); //trust first proxy
const sessionConfig = {
  store: store,
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() * 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.DEV_ENV === "production",
  },
};

/** middleware to initialize session, passport and passport session  */
app.use(session(sessionConfig));
app.use(passport.initialize()); // initialize passport middleware for incoming requests
app.use(passport.session()); //allows persistent sessions

app.use((req, res, next) => {
  console.log(req.user);
  console.log(req.session);
  next();
});

passport.use(UserModel.createStrategy()); // uses strategy used in UserSchema using passport-local-mongoose

// use static serialize and deserialize of model for passport session support
// stores and deletes user data in the USerModel
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

/** Routes */
app.use("/api/auth", authRoutes);

/** middleware for pages not found */
app.use("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((err, req, res, next) => {
  const status = err.status || 400;
  const message = err.message || "Something went wrong";
  res.status(status).json({ message: message });
});

app.listen(process.env.PORT, () => {
  console.log(`SERVING PORT ${process.env.PORT}`);
});
