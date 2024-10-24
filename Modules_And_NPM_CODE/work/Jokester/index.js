const jokes = require("give-me-a-joke");

// colors をインストールしたときに，stringのプロトタイプにrainbowなどの関数を追加している
const colors = require("colors");

jokes.getRandomDadJoke(function (joke) {
  console.log(joke.rainbow);
});
