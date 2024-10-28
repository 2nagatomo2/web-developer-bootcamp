const path = require("path");
const express = require("express");
const app = express();
const reditData = require("./data.json");

app.use(express.static(path.join(__dirname, "public")));

// __dirname は，index.js が置かれているディレクトリの絶対 path である
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params;
  const data = reditData[subreddit];
  // 「...」 spread構文
  if (!data) {
    res.render("notfound", { subreddit });
  }
  res.render("subreddit", { ...data });
});

app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { rand: num });
});

app.get("/cats", (req, res) => {
  const cats = ["タマ", "トラ", "クロ", "モモ", "ジジ"];
  res.render("cats", { cats });
});

app.listen(3000, () => {
  console.log("ポート3000で待受中...");
});
