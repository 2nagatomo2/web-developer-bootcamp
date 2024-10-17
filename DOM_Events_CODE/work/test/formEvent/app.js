const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const itemList = document.querySelector("#list");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const productName = form.elements.product;
  const productAmount = form.elements.qty;
  const newList = document.createElement("li");
  newList.innerText = `${productName.value} x ${productAmount.value}`;
  itemList.appendChild(newList);
  productName.value = "";
  productAmount.value = "";
});
