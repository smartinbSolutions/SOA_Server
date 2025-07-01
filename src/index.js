const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const https = require("https");
const path = require("path");
const connectDB = require("./config/db");

const blogCategoryRoutes = require("./routes/blogCategoryRoutes.js");
const blogRoutes = require("./routes/blogRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const contactInfoRoutes = require("./routes/contactInfoRoutes.js");
dotenv.config({ path: "config.env" });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "uploads")));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use("/api/auth", userRoutes);
app.use("/api/blog-categories", blogCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contactInfo", contactInfoRoutes);

const PORT = process.env.PORT || 8000;

const privateKeyPath = path.join(__dirname, "../PossBackend/pv.key");
const certificatePath = path.join(__dirname, "../PossBackend/certificata.crt");
const caficatePath = path.join(__dirname, "../PossBackend/ca.crt");
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const certificate = fs.readFileSync(certificatePath, "utf8");
const caficate = fs.readFileSync(caficatePath, "utf8");

const credentials = { key: privateKey, cert: certificate, ca: caficate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`App running on port ${PORT} using HTTPS`);
});
