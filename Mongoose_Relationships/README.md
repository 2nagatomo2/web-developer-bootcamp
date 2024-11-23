# DB のリレーション

- データの関連を設計することを schema 設計という
- SQL と noSQL でどちらが優れているとかは，ない．（お互いにメリット，デメリットがある）

## SQL のリレーション

### one to many の場合

- many 側の table データは one 側の table data のどのデータと関連を持つかを識別するための id を持っている

### many to many の場合

- 3 つ目の別の table が必要
- 1 つ目の table の id と 2 つ目の table の id だけを管理する table があれば良い

## mongoDB のリレーション

### one to many

#### one to few (1 対数個)

- 例: user と住所
- schema のプロパティを配列で管理する
- 数個程度であればそのままドキュメントに入れてしまうことが多い
- mongoose ではネストしたプロパティでは自動的に`_id`が振られる
- `_id: {id: false}`とすると，明示的に id を付与させないようにすることができる

#### one to many (1 対たくさん)

```javascript
const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["spring", "summer", "fall", "winter"],
  },
});

const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);
```

- このようにすることで，farmSchema の Products プロパティを ObjectId のみの配列で管理できる
- ref に指定された名前の model の ObjectId を管理する
- データの追加の際は，そのまま object を配列に push すれば，mongoose が ObjectId のみを抜き出して配列に push してくれる

##### population

- `populate(:property)`メソッドによって，指定したプロパティのオブジェクトを全て取ってくることができる．ref プロパティを設定することで実行できる
- `populate(:property, :property)`とすると 1 つ目の property で取ってきたオブジェクトの 2 つ目の property **のみ**を取ってくることができる

#### one to too many (1 対超たくさん)

- 例: X の user と post の関係
- 子に親の情報(id)を持たせることがある
- 数千，数万のデータを同時に扱うことはほとんどないため
- 双方向に参照を持たせるスキーマ設計もある

## スキーマ設計の 6 つのルール

[公式ブログ](https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design)

### リレーションを持っているデータの削除

- findOneAndDelete を呼んだ時に mongoose の post でミドルウェアを定義し，deleteMany で対象 id のデータを消すようにする
