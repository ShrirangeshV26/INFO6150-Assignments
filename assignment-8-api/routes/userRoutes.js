// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const upload = require("../middlewares/upload");

// Assignment endpoints
router.post("/create", userController.createUser);
router.put("/edit", userController.editUser);
router.delete("/delete", userController.deleteUser);
router.get("/getAll", userController.getAllUsers);
router.post("/uploadImage", upload.single("image"), userController.uploadImage);

// Optional login endpoint for "user authentication"
router.post("/login", userController.loginUser);

module.exports = router;
