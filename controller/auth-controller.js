// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/auth");

// Register a new user
const Signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Return the token
    return res.status(201).json({ message: "signup sucessfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login user
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Hash the password
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expiration time
    );

    // Return the token
    return res.status(201).json({
      token,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { Signup, Login };
