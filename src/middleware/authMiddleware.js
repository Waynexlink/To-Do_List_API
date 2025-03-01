const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    //store the jet token in a variable
    const token = req.header("Authorization");

    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied.No token provided " });
    //remove the bearer and verify the jwt token using the jwt key
    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    //find and attach user to request
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "invalid or expired token " });
  }
};

module.exports = authMiddleware;
