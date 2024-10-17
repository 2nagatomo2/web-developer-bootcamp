const input = document.querySelector("input");
const h1 = document.querySelector("h1");

// 入力のフォーカスが外れた時に，入力が変化していたらイベントが発火する。
// input.addEventListener("change", function (e) {
//   console.log("Change!!");
// });

// 入力があるたびにイベントが発火する。
input.addEventListener("input", function (e) {
  console.log("input!!");
  h1.innerText = input.value;
});
