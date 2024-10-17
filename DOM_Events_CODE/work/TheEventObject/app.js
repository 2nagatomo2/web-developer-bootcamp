document.querySelector("button").addEventListener("click", function (evt) {
  console.log(evt);
});

const input = document.querySelector("input");

// code は基準が英字配列なので，JIS配列を使うと意図しないものになる可能性がある．
// key はどのキーが押されたか．
input.addEventListener("keydown", function (e) {
  console.log(`key: ${e.key}, code: ${e.code}`);
});

// Globalなイベント処理として，windowにaddEventListerをつけることもできる．
window.addEventListener("keydown", function (e) {
  switch (e.code) {
    case "ArrowUp":
      console.log("↑");
      break;
    case "ArrowDown":
      console.log("↓");
      break;
    case "ArrowLeft":
      console.log("←");
      break;
    case "ArrowRight":
      console.log("→");
      break;
    default:
      console.log("無視");
      break;
  }
});
