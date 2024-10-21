# Node.js

## Node.js とは

- JavaScript のランタイム
- ブラウザでできることを超えた範囲のものを実装できる
- サーバーサイドのコードを書くことができる
- ブラウザでしかできないこともある
- フロントエンドとバックエンドを同じ言語で完結できるという利点がある

## Node.js では何を作れるのか？

- Web サーバー
- コマンドラインツール
- ネイティブアプリ(単体のアプリ)
- ゲーム(多くの場合は C# の Unity を使う)
- ドローンのソフトウェア
- etc...

## Node.js のインストール

- インストールされているかの確認(REPL に入る)`$ node`
  - Read, Evaluate, Print, Loop の略
- Ctrl+C を 2 回押すか，Ctrl+D か`.exit`で REPL を抜けられる

## Node.js で js ファイルの実行

```sh
$ node example.js
```

### process プロパティ

## file system

- 同期版の関数と非同期版の関数がある
- module を使うには require をする必要がある
- fs モジュールを使うことで，file やディレクトリを作ることができる
