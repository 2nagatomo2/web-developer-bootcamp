# DOM Events Code

## Change and Input Event

## Bubbling

### Capturing phase, Target phase, Bubbling phase

[参考資料](https://tcd-theme.com/2022/09/javascript-bubbling-capturing.html)
**Capturing phase**

- Window オブジェクトから子の要素に降りていく phase

**Target phase**

- イベントが発火した要素に到達した phase

**Bubbling phase**

- イベントが発生した要素から親要素に上がっていく phase

### Bubbling

- DOM Event が親要素に伝播してしまうこと
- 登録されたハンドラが子から親に向かって順に実行されていく
- Bubbling させずに Target phase で止めたい場合は
  ```javascript
  EventTarget.addEventListener(event, function (e) {
    e.stopPropagation();
  });
  ```
  のように`stopPropagation`を実行すれば良い

## Target

- 実際にイベントが発生した要素に到達した段階のフェーズ
- イベントが発生した要素は最も階層の深い要素となる
- `event.target`でアクセスできる

## Capturing

- Capturing phase でイベントハンドラが実行されることは基本的にはない（そもそもどこが Target かわからないから）
- ```javascript
  EventTarget.addEventListener(event, hundler, true);
  ```
  のように`addEventListener`の第 3 引数に `true`を入れると Capturing phase でイベントをキャッチできる

## Delegation
