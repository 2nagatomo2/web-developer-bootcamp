# Rest

## REST とは

- 設計思想

## CRUD

1. Create(作成) = GET
2. Read(参照) = POST
3. Update(更新) = PUT, PATCH
4. Delete(削除) = DELETE

## resource

- 一つの url と一つの resource がセットになっている

## uuid

- universal unique identifier
- uuid package が存在する
- 普通に require すればおけ

## PATCH と PUT の違い

- PATCH は部分的な更新，PUT は全体を新しいもので置き換える

## method override

- html の form は GET, POST しかできない
- method-override というミドルウェアをインストールして post メソッドから，patch, delete へ method を override する

```javascript
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
```

javascript でこのように method-override を宣言して，html の form で

```html
<form action="/comments/<%= comment.id %>?_method=PATCH" method="POST">
  <button>保存</button>
</form>
```

このように query string で渡すことで，post メソッドを express で patch に変更できる
