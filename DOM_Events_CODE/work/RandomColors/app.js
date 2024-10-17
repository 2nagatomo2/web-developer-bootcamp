const h1 = document.querySelector("h1");
const btn = document.querySelector("button");

function onclick() {
  const newColor = makeRandomColor();
  h1.innerText = newColor;
  document.body.style.backgroundColor = newColor;
}

function makeRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

btn.addEventListener("click", onclick);
