//INITIALIZING EXPRESS
const express = require("express");
//CREATING AN EXPRESS SERVER
const app = express();
//MIDDLEWARES
app.use(express.json());
app.get("/", (req, res) => {
  res.send("This is the home page ");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
