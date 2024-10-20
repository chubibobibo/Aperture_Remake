import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cors from "cors";
import MongoStore from "connect-mongo";
import cloudinary from "cloudinary";

import authRoutes from "./routes/authRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import passport from "passport";
import { UserModel } from "./models/UserSchema.js";

/** DEPLOYING serving public folder */
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "connect-src": ["'self'", "https://api.mapbox.com/"],
      "default-src": ["'self'"],
      "base-uri": ["'self'"],
      "font-src": ["'self'", "https:", "data:"],
      "frame-ancestors": ["'self'"],
      "img-src": ["'self'", "data:", "http://res.cloudinary.com", "https://*.tile.openstreetmap.org"],
      "script-src": ["'self'"],
      "script-src-attr": ["'none'"],
      "style-src": ["'self'", "https:", "'unsafe-inline'"],
    },
  })
);
app.use(mongoSanitize());

/** middleware function parses requests with json payloads */
app.use(express.json());
app.use(cors());

/** database connection */
main().catch((err) => console.log(err));
async function main() {
  // await mongoose.connect(process.env.MONGO_DB_URL);
  await mongoose.connect(process.env.MONGO_ATLAS);
}

/** Express sessions used with passportJS */
/** @store session store use to prevent memory leaks */
/** @sessionConfig uses store (mongoStore) as session storage and will be used as config when session is instantiated */
const store = MongoStore.create({
  mongoUrl: process.env.MONGO_ATLAS,
  secret: process.env.MONGO_SECRET,
  touchAfter: 24 * 60 * 60, // interval between session update
});

store.on("error", (e) => {
  console.log("Session error");
});

app.set("trust proxy", 1); //trust proxy1
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

passport.use(UserModel.createStrategy()); // uses local strategy used in UserSchema using passport-local-mongoose

// use static serialize and deserialize of model for passport session support
// stores and deletes user data in the USerModel
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

/** CLOUDINARY CONFIG */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

/** Routes */
app.use("/api/auth", authRoutes);
app.use("/api/photo", photoRoutes);
app.use("/api/comment", commentRoutes);

/** access to index.html in client */
app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

/** middleware for pages not found and  errors */
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
