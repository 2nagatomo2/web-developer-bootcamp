const button = document.createElement("button")
button.innerText = "I am a student of 42 Tokyo"
const container = document.getElementById("container")

for (let i=0; i<100; i++) {
    container.appendChild(button);
}