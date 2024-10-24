# モジュールと NPM

## module.exports

- `require("相対path")`で，指定したファイルで`module.exports.モジュール名`で export したモジュールを取得できる
- `module.exports`は`exports`と省略できる(ただし，exports を新しい変数として定義してしまうと上書きされてしまう)

## ディレクトリを require したとき

- そのディレクトリの index.js が実行される．
- index.js で exports しているものが返り値で渡される．
- exports が設定されていないときは空の object が返される．

## npm (Node Package manager)

- 他の開発者が公開しているパッケージが管理されている
- npm コマンドを使ってこれらのパッケージをインストールできる

### install したとき

- `npm i {packageName}`でインストールできる
- `npm i -g {packageName}` でグローバルインストールされる
  - 多くの場合，コマンドラインツールのインストールで使われる

### 初期化

- `npm init`で package の初期化ができる
- 質問に沿って package.json が作成される

#### 作成されるファイル

- node_modules
  - 依存性があるファイルが全て入っている
  - 基本的に削除はしない
  - module は package がインストールされたときのディレクトリの中で使われることが想定されている
- package-lock.json
- package.json
  - package の情報が記述されている
    - author
    - dependencies
    - version
    - license
    - etc...
  - dependencies で，package で使っている module がわかる
  - `npm install`で node_modules がない状態から，依存ファイルを含んだ node_modules を作成できる
