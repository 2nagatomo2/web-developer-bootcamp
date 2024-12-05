# Yelp Camp

## Validation

### JOI

- validation 用の package

```javascript
const schema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required(),
  }),
});
schema.validate(req.body);
```

- のようにして validation の schema とその validation を作成できる
- mongoose の schema とは別物なので注意

## express.Router

- ルーティングを全て app.js に書いていると app.js が肥大化する
- そのため，ルーティングをドメインで分割するためのものとして express.Router がある
- ルーティング先のファイルで以下のように定義する

  ```javascript
  const express = require("express");
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("dog route page");
  });

  module.exports = router;
  ```

- router を呼び出すファイル(今回は app.js)では以下のようにする

  ```javascript
  const express = require("express");
  const app = express();
  const dogRoutes = require("./routes/dogs");
  const catRoutes = require("./routes/cats");

  app.use("/dogs", dogRoutes);
  app.use("/cats/:id", catRoutes);
  ```

- id などのパラメータが必要な場合はルーティング先のファイルで，Router を定義する際に，**mergeParams オプションを true にする必要がある**

  ```javascript
  const express = require("express");
  // ここでmergeParamsをtrueにすることで，親からparamsを引き継ぐことができる
  const router = express.Router({ mergeParams: true });

  router.get("/", (req, res) => {
    res.send("dog route page");
  });

  module.exports = router;
  ```

## 静的ファイルの設定

- 自分のサーバーから静的ファイルを提供できるようにするためのもの．
  - 共通の bootstrap, 画像, css など
- app.js で express.static を use すれば良い．

  ```javascript
  app.use(express.static(path.join(__dirname, "public")));
  ```

## session

[express-sesison の github](https://github.com/expressjs/session#readme)

- ユーザー情報と別のデータ(サードパーティのものだったり)を結びつけるもの
- sessionID を発行することで通信する
- `npm i express-session`でインストールできる
  - mongoose のバージョン次第で脆弱性が生まれる可能性がある．
- sessionConfig で secret, resave, saveUninitialized などを設定

  - cookie
    - maxAge
      - session の期限．単位は ms．設定すると Expires に設定が増える．ログイン情報などが永久に続くとよくない
    - httpOnly
      - Cookie へのアクセス制限．セキュリティ的に大切
      - デフォルトで true になっている
      - javascript などから cookie を覗くことができないようになる

  ```javascript
  const session = require("express-session");

  const sessionConfig = {
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 有効期限を1週間に設定(単位はms)
      httpOnly: true,
    },
  };
  app.use(session(sessionConfig));

  app.get("/", (req, res) => {
    res.render("home");
  });
  ```

- 開発者画面の application の cookies に connect.sid というのが増えている

## flash

- 常には表示されず，登録などのアクションをした後に一度だけ表示されるもの
- `npm i connect-flash`でインストールできる
