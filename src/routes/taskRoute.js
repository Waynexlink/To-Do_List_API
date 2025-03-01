const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { createTask } = require("../controller/taskController");

const router = express.Router();

router.get("/", authMiddleware, createTask);

module.exports = router;
