//INITIALIZING EXPRESS
const express = require("express");
const connectDB = require("./src/config/db");

//test
const User = require("./src/models/userModel");
const Task = require("./src/models/taskModel");
//CREATING AN EXPRESS SERVER
const app = express();

//STARTING UP DATABASE
connectDB();
//MIDDLEWARES
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("This is the home page ");
});

//test route
app.get("/test", async (req, res) => {
  try {
    const newUser = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "secure123",
    });

    const newTask = await Task.create({
      title: "Finish project",
      user: newUser._id,
    });

    res.json({ newUser, newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
