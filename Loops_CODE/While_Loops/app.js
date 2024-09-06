// let count = 0;
// while (count < 10) {
//     count++;
//     console.log(count);
// }

// while (!gameOver) {
//     // player 1
//     // player 2
// }

// const SECRET = 'supersecret';

// let guess = '';

// while (guess !== SECRET) {
//     guess = prompt('秘密のコードを入力してください');
// }
// console.log('正解！！おめでとう！！');

// let input = prompt('なにか入力してください');
// while(true) {
//     input = prompt(input);
//     if (input === 'quit') break;
// }

// for (let i = 0; i < 1000; i++) {
//     console.log(i);
//     if (i === 100) break;
// }


let maximum = parseInt(prompt('数字を入力してください:'));
while (!maximum) {
    maximum = parseInt(prompt('エラーが起きました。有効な数字を入力してください:'));
}

const targetNum = Math.floor(Math.random() * maximum) + 1;

let guess = prompt('一つ数字を決めました。数字を当ててみてください:');
let count = 1;

while (parseInt(guess) !== targetNum) {
    if (guess === 'q') break;
    count++;
    if (guess > targetNum) {
        guess = prompt('その数字より小さいです！もう一度当ててみてください:');
    } else {
        guess = prompt('その数字より大きいです！もう一度当ててみてください:');
    }
}

if (guess === 'q') {
    console.log('終了します');
} else {
    console.log(`おめでとう！${count}回で当てました！`)
}
