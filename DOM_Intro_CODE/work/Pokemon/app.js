const container = document.querySelector("#container");
const baseURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

for(let i=1; i<=1025; i++) {
    const pokemon = document.createElement("div");
    pokemon.classList.add("pokemon")
    const newImg = document.createElement("img");
    const span = document.createElement("span");
    newImg.src = `${baseURL}${i}.png`;
    span.innerText = `#${i}`;
    pokemon.appendChild(newImg);
    pokemon.appendChild(span);
    container.appendChild(pokemon);
}