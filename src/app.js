const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("../public"));

app.set("view engine", "ejs");
app.set("views", "../views");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/signup", (req, res) => {
  res.render("./userPages/signup")
});

app.get("/login", (req, res) => {
  res.render("./userPages/login")
});


module.exports = app;
