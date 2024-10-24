const franc = require("franc");
const langs = require("langs");
const colors = require("colors");

if (process.argv.length != 3) {
  console.log("入力の形式が正しくありません".red);
  return;
}

const input = process.argv[2];
const length = input.length;
const langCode =
  length < 10 ? franc(input, { minLength: length }) : franc(input);

try {
  const language = langs.where("3", langCode).name;
  console.log(`「${language.green}」でしょうか？`);
} catch (e) {
  console.log(
    "入力された文字列では適切に解析できませんでした。\nもう少し長い文章を入力してください。"
      .red
  );
}
