// controllers/userController.js
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Regex validations according to assignment
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const nameRegex = /^[A-Za-z ]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const validateUserInput = ({ fullName, email, password }, isUpdate = false) => {
  const errors = [];

  if (fullName !== undefined) {
    if (!fullName || !nameRegex.test(fullName)) {
      errors.push(
        "Full Name must contain only alphabetic characters and spaces."
      );
    }
  }

  if (!isUpdate) {
    if (!email || !emailRegex.test(email)) {
      errors.push("Email is in invalid format.");
    }
  } else if (email !== undefined) {
    errors.push("Email cannot be updated.");
  }

  if (password !== undefined) {
    if (!passwordRegex.test(password)) {
      errors.push(
        "Password must be at least 8 characters and include uppercase, lowercase, digit, and special character."
      );
    }
  }

  return errors;
};

// POST /user/create
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const errors = validateUserInput({ fullName, email, password }, false);
    if (errors.length > 0) {
      return res.status(400).json({
        error: "Validation failed.",
        details: errors,
      });
    }

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({
          error: "Validation failed.",
          details: ["Email already exists."],
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await User.create({
      fullName,
      email: email.toLowerCase(),
      password: hashed,
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("createUser error:", err);
    return res.status(500).json({ error: "Server error." });
  }
};

// PUT /user/edit
exports.editUser = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Validation failed.", details: ["Email is required."] });
    }

    const errors = validateUserInput({ fullName, password }, true);
    if (errors.length > 0) {
      return res
        .status(400)
        .json({ error: "Validation failed.", details: errors });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (fullName !== undefined) user.fullName = fullName;

    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    return res.status(200).json({ message: "User updated successfully." });
  } catch (err) {
    console.error("editUser error:", err);
    return res.status(500).json({ error: "Server error." });
  }
};

// DELETE /user/delete
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Validation failed.", details: ["Email is required."] });
    }

    const user = await User.findOneAndDelete({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    console.error("deleteUser error:", err);
    return res.status(500).json({ error: "Server error." });
  }
};

// GET /user/getAll
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "fullName email password imagePath");

    return res.status(200).json({
      users: users.map((u) => ({
        fullName: u.fullName,
        email: u.email,
        password: u.password, // hashed
        imagePath: u.imagePath,
      })),
    });
  } catch (err) {
    console.error("getAllUsers error:", err);
    return res.status(500).json({ error: "Server error." });
  }
};

// POST /user/uploadImage
exports.uploadImage = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Validation failed.", details: ["Email is required."] });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image file is required." });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (user.imagePath) {
      return res
        .status(400)
        .json({ error: "Image already exists for this user." });
    }

    user.imagePath = `/images/${req.file.filename}`;
    await user.save();

    return res.status(201).json({
      message: "Image uploaded successfully.",
      filePath: user.imagePath,
    });
  } catch (err) {
    console.error("uploadImage error:", err);

    if (err.message && err.message.startsWith("Invalid file format")) {
      return res.status(400).json({
        error: "Invalid file format. Only JPEG, PNG, and GIF are allowed.",
      });
    }

    return res.status(500).json({ error: "Server error." });
  }
};

// OPTIONAL: POST /user/login (for "user authentication" goal)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          error: "Validation failed.",
          details: ["Email and password are required."],
        });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({
          error: "Validation failed.",
          details: ["Invalid credentials."],
        });
    }

    return res.status(200).json({ message: "Login successful." });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ error: "Server error." });
  }
};
