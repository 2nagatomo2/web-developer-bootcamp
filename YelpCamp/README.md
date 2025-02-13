# Yelp Camp

## 今回用いた技術スタック

### server side environment

- node.js
- nodemon

### web flamework

- express

### database

- mongodb

### Database Object Adaptor

- mongoose

### view engine

- ejs
- ejs-mate

### http method override

- method-override

### schema validation

- joi

### session, flash

- express-session
- connect-flash

### authentication

- passport
- passport-local
- passport-local-mongoose

[passport を express で使うなら](https://mherman.org/blog/local-authentication-with-passport-and-express-4/)

### storage

- cloudinary

### image encoding

- multer

### environment value

- dotenv

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

[connect-flash の公式サイト](https://www.npmjs.com/package/connect-flash)

- 常には表示されず，登録などのアクションをした後に一度だけ表示されるもの
- `npm i connect-flash`でインストールできる
  - session と同様に，version 次第で mongoose との間で脆弱性が生まれる場合がある
- 以下のようにすることで，どこでも flash メソッドを req オブジェクトに対して使えるようになる

  ```javascript
  const flash = require("connect-flash");
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });
  ```

  - res.locals はこの http リクエストに対してのみ付与できる変数．
  - リクエストが更新されると変数は削除される
  - flash の引数のはキーワードを設定する

- ルーティング先では，以下のように書くとよい．
  ```javascript
  router.post(
    "/",
    validateCampground,
    catchAsync(async (req, res) => {
      const newCampground = new Campground({
        ...req.body.campground,
      });
      await newCampground.save();
      req.flash("success", "新しいキャンプ場を登録しました");
      // ここでflashの第一引数のキーワードに対して，第二引数でメッセージを提供する
      res.redirect(`campgrounds/${newCampground._id}`);
    })
  );
  ```
- あとはこれを partial などで html に書いて使えば良い

## 認証

### passport

- express でさまざまな認証機能を実装できるライブラリ
  [passport 公式サイト](https://www.passportjs.org/)

#### passport-local

- username と password のみの認証機能のサポート
- passport, passport-local をインストールする必要がある
- mongoose を使う場合は passport-local-mongoose も
- schema を作成し，`schema.plugin(passportLocalMongoose)`とすることで passport を導入することができる
- `passport.authenticate($localstrategy, $options)`で，request body の user 名とパスワードを自動で見てくれて，データベースの hash 化したパスワードと一致した場合，認証成功できる．
- passport を使っていると，req のメソッドに isAuthenticated が追加されている．
- req のメソッドに logout 関数も追加されている
  - ⚠️ 動画では，`logout()`と呼ぶだけでログアウトしているが，実際は第一引数に エラー時の callback 関数を渡さないとエラーになる。
  - [passport logout](https://www.passportjs.org/concepts/authentication/logout/)
  - get メソッドより，post や delete メソッドで logout の処理を呼ぶ方が，偶発的な logout を避けられるという理由で，公式から推奨されている
- req オブジェクトに login 関数もある
  - 新規登録後は，login を明示的に呼ぶ必要がある．
  - `passport.authenticate()`は内部で login を呼んでいる。
- `req.user`に user 情報が格納されている。
  - login していない場合は undefined になる。
  - `res.locals`に currentUser 情報を入れれば，現在 user がいるかどうかがわかる。
- ユーザー体験向上のために，login user のみが閲覧できるサイトに，非 login user が訪れた際に，req.session.retuenTo にその path を保存しておき，login 後はその path に redirect する処理を書いたが，どうしても passport.authenticate の前後で，req.session.returnTo が失われてしまう。git から download したものや udemy では大丈夫なのだが，どうしても自分のコードでは正しく動かない。

## 認可

- 自分で実装することが多い
- login user かどうか，author かどうかなど
- populate は path プロパティを使うことでネストできる

## 画像のアップロード

- db に直接画像を置くことはしない
  - scaling しづらいため
  - db のデータの容量が限られている場合があるため
- 他の storage に画像を保存し，db はその storage の url を持つようにする．
- 今回は[cloudinary](https://console.cloudinary.com/pm/c-50a700b3917f8e426b9fe909bc192b/getting-started)を使う

### multer

- 画像アップロード用のパッケージ

### dotenv

- `npm i dotenv`
- 環境変数を設定できる．
- API key など他者に共有してはいけない情報は環境変数に入れる．
- code の中で使うときは `process.env.{環境変数}`で呼び出せる．
- .env ファイルに環境変数を格納する．
- .env ファイルは共有してはいけないので，.gitignore に追加しておく．
