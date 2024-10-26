const express = require("express");
const app = express();
const port = 3000;

// app.use((req, res) => {});

app.get("/cats", (req, res) => {
  res.send("にゃー");
});

app.get("/dogs", (req, res) => {
  res.send("わんわん");
});

app.get("/", (req, res) => {
  res.send("ここはホームページです");
});

app.get("/r/:subreddit", (req, res) => {
  res.send("サブレディットページ");
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (q) {
    res.send(`<h1>「${q}」の検索結果!!`);
  } else {
    res.send("検索ワードがありません");
  }
});

app.get("/r/:subreddit/:postId", (req, res) => {
  const { subreddit, postId } = req.params;
  res.send(`<h1>${subreddit} ${postId}のページ`);
});

app.get("*", (req, res) => {
  res.send("適切なパスではありません");
});

app.listen(port, () => {
  console.log("リクエストをポート3000で待機中...");
});
