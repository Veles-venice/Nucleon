require("dotenv").config();
const app = require("./app");
// const express = require("express");
// const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))
app.set("view engine","ejs")

app.set("views","./views")


app.get("/", (req, res) => {
  res.render("index.ejs")
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
