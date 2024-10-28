# テンプレートを使った動的な html

## ejs

- embedded JavaScript の略
- 穴埋め問題のような形で，動的な html ファイルを作成できる
- `npm i ejs`でインストールできる
- `app.set("view engine", "ejs")`で ejs を使えるようになる
- views ディレクトリを作成し，その中に view を作成する

## ejs の構文

- `<%= javascript code %>`のようにすることで，html ファイル内に **javasctipt のコードで得たれた値**を埋め込める
- `<% javascript code %>`のようにすると，html には表示されないようになる
  - if 文や for ループなどのロジックを書くことができる
- `<%- include("path-to-partial") %>`で partial ファイルを読み込むことができる．テンプレートからテンプレートを読み込める
  - このタグで囲ったものは html として認識されて表示される．
  - component みたいなもの

## render 関数

- 第 2 引数にオブジェクトを渡すことで，ejs などのファイルで，そのオブジェクトの value を呼び出すことができる

```javascript
app.get("/", (req, res) => {
  const title = "Home Page";
  res.render("home", { title: title });
});
```

## 静的ファイルの参照

- `app.use(express.static("public"))`のようにすることで public ディレクトリにある静的ファイルを常に参照できるようになる

## 参照 path モジュール

- path は node の組み込みモジュール

```javascript
const path = require("path");
const express = require("express");
const app = express();

app.set("view", path.join(__dirname, "views"));
```

上のようにすることで，どのディレクトリでサーバーを立ち上げても，デフォルトで views が参照できるようになる
