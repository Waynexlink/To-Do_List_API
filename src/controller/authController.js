const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//signup route

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    //create new user
    const createUser = await User.create({ name, email, password });

    //success message
    res.status(201).json({ message: "user successfully created " });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//loginroute

exports.loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //find user by email and drag password in
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ message: "invalid credentials", error: error.message });

    //check password match
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res
        .status(400)
        .json({ message: "invalid credentials", error: "error.message" });

    //generate jwt token

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
