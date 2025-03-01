const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controller/authController");

const { validateRegister } = require("../middleware/validateUser");

//handling register and login route
router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);

module.exports = router;
