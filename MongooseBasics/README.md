# Mongoose

## Mongoose とは

- NodeJS から使える ODM(Object Data Mapper)
- 講義では version5 を使っているが，現在は version8 が出ているので，ドキュメントを直接読んだ方が良さそう
- [mongoose ホームページ](https://mongoosejs.com/)

### ODM とは

- データベースから送られてくるデータを JavaScript のオブジェクトにマッピングする
- 便利なメソッドを備えたオブジェクトにできる

## Validation

- validation の value を配列にして，第一引数に validation の値，第二引数にエラーメッセージを書くことで，schema の validation に引っかかった時のエラーをカスタムできる
- enum を使って，値を制限する validation も存在する

```javascript
const mongoose = require("mongoose");
const schema = mongoose.Schema{
  key: {
    type: Number,
    min: [0, "カスタムエラーメッセージ"],
  },
};
```

## インスタンスメソッドと static メソッド

### インスタンスメソッド

- new で作ったインスタンスに対して使えるメソッド
- `schemaName.methods.instanceMethod = function() {~}`のようにすることでインスタンスメソッドを作れる
- インスタンスメソッドの this はインスタンス

### static メソッド

- class に対して使えるメソッド
- `schemaName.statics.staticMethod = function() {~}`のようにすることで static メソッドを作れる
- static メソッドの this は model 自身
- find,update,delete を wrap してよりわかりやすくするために使うことが多い

## virsutal

- 実際の database には存在しない property を定義する時に使う
- `schemaName.virtual(propertyName).get(function() {~})`とすることで，propertyName があたかも db に存在するかのように振る舞える
- set もある

## ミドルウェア

- 特定のメソッドに対してミドルウェアを定義することで，様々な処理を加えることができる
