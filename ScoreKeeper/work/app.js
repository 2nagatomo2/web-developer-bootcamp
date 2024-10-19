const p1 = {
  score: 0,
  button: document.querySelector("#p1button"),
  display: document.querySelector("#p1Display"),
};

const p2 = {
  score: 0,
  button: document.querySelector("#p2button"),
  display: document.querySelector("#p2Display"),
};

const winningScoreSelect = document.querySelector("#winningScore");
const resetButton = document.querySelector("#resetButton");
let winningScore = 3;

winningScoreSelect.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});

function updateScores(player, opponent) {
  if (player.score === winningScore || opponent.score === winningScore) {
    return;
  }
  player.score++;
  player.display.innerText = player.score;
  if (player.score === winningScore) {
    player.display.classList.add("has-text-success");
    opponent.display.classList.add("has-text-danger");
    player.button.disabled = true;
    opponent.button.disabled = true;
  }
}

p1.button.addEventListener("click", function () {
  updateScores(p1, p2);
});

p2.button.addEventListener("click", function () {
  updateScores(p2, p1);
});

resetButton.addEventListener("click", reset);

function reset() {
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.innerText = p1.score;
    p.display.classList.remove("has-text-success", "has-text-danger");
    p.button.disabled = false;
  }
}
