//INITIALIZING EXPRESS
const express = require("express");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authroute");
const taskRoutes = require("./src/routes/taskRoute");

//CREATING AN EXPRESS SERVER
const app = express();

//STARTING UP DATABASE
connectDB();
//MIDDLEWARES
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

//routes
app.get("/", (req, res) => {
  res.send("This is the home page ");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
