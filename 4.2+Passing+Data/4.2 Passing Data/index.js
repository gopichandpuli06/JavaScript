import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var message = "Enter your name";
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const value = req.body["fName"].length + req.body["lName"].length;
  console.log(req.body);
  console.log(value);
  //message = `There are ${value} letters in your name`;
  res.render("index.ejs", {
    numberLetters: value
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
