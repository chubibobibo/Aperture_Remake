import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/authRoutes.js";

const app = express();

/** middleware function parses requests with json payloads */
app.use(express.json());

/** database connection */
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

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
