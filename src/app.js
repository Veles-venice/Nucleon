const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
