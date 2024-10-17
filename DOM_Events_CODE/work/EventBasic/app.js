const btn = document.querySelector("#v2");

btn.onclick = function () {
  console.log("クリックした！");
  console.log("hogeghoge");
};

function scream() {
  console.log("aaaaaaaaa!");
  console.log("yaaaaaaaa!");
}

btn.onmouseenter = scream;

document.querySelector("h1").onclick = () => {
  alert("h1をクリック");
};

const btn3 = document.querySelector("#v3");
btn3.addEventListener("click", scream);

function hoge() {
  console.log("hoge");
}

function moge() {
  console.log("moge");
}

// megeしか出てこない．複数の関数を割り当てることができない．
const hogemogeButton = document.querySelector("#hogemoge");
// hogemogeButton.onclick = hoge;
// hogemogeButton.onclick = moge;

// addEventLister なら複数の関数を割り当てられる．
// optionを設定できる．
// eventを自作することもできる．
hogemogeButton.addEventListener("click", hoge, { once: true });
hogemogeButton.addEventListener("click", moge);
