const express = require("express");
const { CategoryRoute } = require("./router/category");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
var cors = require("cors");

require("dotenv").config();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/category", CategoryRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;