// server.js

const User = require("./models/User");

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// ===== DB =====
connectDB();

// ===== Middlewares =====
app.use(cors());
app.use(express.json());

// ===== Static images (uploaded images will be served from /images) =====
app.use("/images", express.static(path.join(__dirname, "images")));

// ===== Swagger =====
const swaggerPath = path.join(__dirname, "swagger", "swagger.json");
const swaggerDoc = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// ===== Routes =====
app.use("/user", userRoutes);

// JSON endpoint for companies (used by React CompanyShowcase)
app.get("/companies", async (req, res) => {
  try {
    const users = await User.find({}, "fullName email imagePath");

    const companies = users.map((u) => ({
      id: u._id,
      name: u.fullName || u.email,
      url: u.imagePath || null, // React will show "No Image" if null
    }));

    res.json(companies);
  } catch (err) {
    console.error("Error in /companies:", err);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
});

// Root
app.get("/", (req, res) => {
  res.json({
    message: "Assignment 8 API running. Go to /api-docs for Swagger UI.",
  });
});

// ===== Start =====
const PORT = process.env.PORT || 5001; // 🔴 IMPORTANT: 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
