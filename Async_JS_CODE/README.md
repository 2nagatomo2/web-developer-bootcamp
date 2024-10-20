# 非同期な JavaScript

## Promise

- Promise は非同期処理の最終的な完了もしくは失敗を表すオブジェクト
- 成功か失敗かはわからないが，未来では何かしらのものが返されるオブジェクト

### promise の三つの状態

- pending: 待機状態
- fullfilled: 処理が成功した場合の状態
- rejected: 処理が失敗した場合の状態

### primise の処理が成功した場合の処理と失敗した場合の処理

```javascript
const request = fakeRequestPrimise(url);
request
  .then("処理が成功した時のコールバック関数")
  .catch("処理が失敗した時のコールバック関数");
```

- then のコールバック関数の引数で，promise が resolve された時の返り値を受け取れる
- catch のコールバック関数の引数で，promise が reject された時の返り値を受け取れる

### promise の処理の簡潔化

- `then()`の処理の中で promise を return できる
- promise を return した時，`then()`を連結させることで，コードの階層を深くせずに書くことができる
- `catch()`の処理を個別に書くことはできない

```javascript
fakeRequestPromise("url1")
  .then(() => {
    console.log("コールバック1");
    return fakeRequestPromise("url2");
  })
  .then(() => {
    console.log("コールバック2");
    return fakeRequestPromise("url3");
  })
  .then(() => {
    console.log("コールバック3");
  })
  .catch(() => {
    console.log("失敗した時のコールバック");
  });
```

### promise を返す関数を作る

- 誰かが作った promise を返す関数を使うことのほうが多い
- promise を作るときは`new Promise()`に成功した時と失敗した時の処理の関数を引数とするコールバック関数を書く

  ```javascript
  const fakeRequestPromise = () => {
    return new Promise((resolve, reject) => {
      // 何かの処理
      resolve("成功"); // 文字列はresolveの引数になる
      return;
      // 何かの処理
      reject("失敗"); // 文字列はrejectの引数になる
    });
  };
  ```

## async function

- 非同期(async)な処理をもっとスッキリと書ける新しい構文

### async

- async な関数は必ず Promise を返す
- 関数が値を返せば，Promise はその値を resolve で返す
- 関数がエラーを throw すれば，Promise はその値を reject で返す
  - `throw`というキーワードの後に書いたものを error として返すことができる

### await

- **await は async 関数の中でしか使えない**
- promise が resolve または reject されるのを待つことができる
- promise を使う場合は`then(コールバック関数)`のように書かなければいけなかった
- async, await を使うことで，関数を列挙するのみで良くなった．
- await を使った時に，resolve された時の返り値を受け取るには，`const data = await asyncFunction()`のように書けば良い
- reject された時の処理は try-catch を使って書く

  ```javascript
  async function makeRequest() {
    try {
      const data1 = await fakeRequest("/hoge1");
    } catch (e) {
      console.log(e);
      // この e が reject の返り値
    }
  }
  ```
