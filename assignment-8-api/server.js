// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const swaggerUi = require("swagger-ui-express");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve images
app.use("/images", express.static(path.join(__dirname, "images")));

// Swagger
const swaggerPath = path.join(__dirname, "swagger", "swagger.json");
const swaggerDoc = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routes
app.use("/user", userRoutes);

// Root
app.get("/", (req, res) => {
  res.json({
    message: "Assignment 8 API running. Go to /api-docs for Swagger UI.",
  });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
