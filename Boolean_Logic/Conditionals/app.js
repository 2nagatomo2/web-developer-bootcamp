
// let random = Math.random();
// if (random < 0.5) {
//     console.log('数字は0.5より小さい！');
// } else {
//     console.log('数字は0.5以上！！');
// }
// console.log(random);

// const dayOfWeek = prompt('英語で曜日を入力してください').toLowerCase();

// if (dayOfWeek === 'monday') {
//     console.log('月曜日は憂鬱');
// } else if (dayOfWeek === 'saturday') {
//     console.log('土曜日は最高');
// } else if (dayOfWeek === 'friday') {
//     console.log('仕事が終わってからの花金は最高');
// } else {
//     console.log('はぁ。。。');
// }

// 0-5 無料
// 5-10 子供料金
// 10-65 大人料金
// 65+ シニア料金

// const age = -1000;

// if (age < 5) {
//     console.log('無料になります');
// } else if (age < 10) {
//     console.log('子供料金なので1000円になります');
// } else if (age < 65) {
//     console.log('大人料金なので2000円になります');
// } else {
//     console.log('シニア料金なので1000円になります');
// }


const password = prompt('パスワードを入力してください');

// パスワードは6文字以上
if (password.length >= 6) {
    // パスワードには空白を含めてはいけない
    if (password.indexOf(' ') === -1) {
        console.log('素晴らしいパスワードです！');
    } else {
        console.log('パスワードは空白を含んではいけません。');
    }
} else {
    console.log('パスワードが短すぎます。6文字以上にしてください。')
}

