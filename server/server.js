import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app = express();

/** middleware function parses requests with json payloads */
app.use(express.json());

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
