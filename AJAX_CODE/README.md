# Ajax と API

## Ajax

- Asynchronous Javascript And XML の略称
- レスポンスは json データが多い
- XML はあまり使われていないが Json の時でも Ajax と呼ばれる
- Ajax を使うことで情報を送ったり，受け取ったりする処理が同じ web ページで可能になる

## API

- Application Programming Interface の略称
- API は HTTP を使って特定の url とデータのやり取りをする入り口
- web エンジニアが API というときは web API を指すことが多い
- web API エンドポイントからさまざまな情報を受け取ることができる

## データのやり取りをする

## XML

- 最近は主流ではない
- タグは自分で決める

## JSON

- Java Script Object Notation
- テキストベースのデータ
- Javascript の object と似ている(同じではない)
- undefined は入れられない
- それぞれの言語で Json からデータを使える形に変換してコードで使う
- javascript では`JSON.parse(data)`とすれば Json から object に変換できる
- `JSON.stringify(object)`とすると，object から Json に変換できる(undefined は省略されたり null に変換されたりする)

## javasctipt fetch メソッド

- `fetch(url)`で http レスポンスを受け取ることができる
- fetch メソッドで返ってくるものから json を取り出すことはできない
- await して情報を完全に取得してから出ないと json データを得られない

## axios

- fetch と比べた時に楽な点として、json の data を一度に取得できる点が挙げられる
- get メソッドの第二引数で header や queryString を設定できる
  - object を作り，headers という key に対して object を設定すると http ヘッダーを設定できる
  - object を作り，params という key に対して object を設定すると queryString を追加できる
