const h1 = document.querySelector("h1");
const input = document.querySelector("input");

input.addEventListener("input", () => {
  h1.innerText =
    input.value == "" ? "Enter Your Username" : "Welcome, " + input.value;
});
