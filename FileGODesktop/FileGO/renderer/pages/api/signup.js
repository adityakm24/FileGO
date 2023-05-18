const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const clientPromise = require("../../../lib/mongo");
const { check, validationResult } = require("express-validator");

// Handle POST requests to /api/signup
router.post(
  "/api/signup",
  // Validate user input
  [
    check("emailID", "Please enter a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const client = await clientPromise;

    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Check if request body is not empty or missing
      if (!req.body) {
        return res
          .status(400)
          .json({ error: "Request body is empty or missing" });
      }

      // Check if username already exists
      const db = client.db();
      const existingUser = await db
        .collection("users")
        .findOne({ emailID: req.body.emailID });
      if (existingUser) {
        return res.status(400).json({ error: "Email already taken" });
      }

      // Hash password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create new user with hashed password
      const newUser = {
        emailID: req.body.emailID,
        password: hashedPassword,
      };

      // Save new user to database
      await db.collection("users").insertOne(newUser);

      res.status(200).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

module.exports = router;
