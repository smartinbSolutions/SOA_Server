const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const path = require("path");
const connectDB = require("./config/db");

const blogCategoryRoutes = require("./routes/blogCategoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const contactInfoRoutes = require("./routes/contactInfoRoutes");

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

  const privateKeyPath = path.join(__dirname, "../PossBackend/pv.key");
  const certificatePath = path.join(__dirname, "../PossBackend/certificata.crt");
  const caficatePath = path.join(__dirname, "../PossBackend/ca.crt");

  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const certificate = fs.readFileSync(certificatePath, "utf8");
  const caficate = fs.readFileSync(caficatePath, "utf8");

  const credentials = { key: privateKey, cert: certificate, ca: caficate };

  https.createServer(credentials, app).listen(PORT, () => {
    console.log(`🔒 HTTPS Server running at https://localhost:${PORT}`);
  });
};

startServer();
