import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import https from "https";
import path from "path";
import connectDB from "./config/db";

import blogCategoryRoutes from "./routes/blogCategoryRoutes";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";
import contactInfoRoutes from "./routes/contactInfoRoutes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

console.log("🧩 Static files will be served from:", path.join(__dirname, "public"));
app.use("/public", express.static(path.join(__dirname, "../public")));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contactInfo", contactInfoRoutes);

// Test route
app.get("/", (_req, res) => {
  res.send("✅ API is up and running with HTTPS!");
});

// Start HTTPS Server
const startServer = async () => {
  await connectDB();

  const key = fs.readFileSync(path.join(__dirname, "key.pem"));
  const cert = fs.readFileSync(path.join(__dirname, "cert.pem"));

  https.createServer({ key, cert }, app).listen(PORT, () => {
    console.log(`🔒 HTTPS Server running at https://localhost:${PORT}`);
  });
};

startServer();
