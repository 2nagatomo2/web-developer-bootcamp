const fs = require('fs');
const dirName = process.argv[2] || 'Project';
// console.log(fs);

// fs.mkdir('Dogs', { recursive: true }, (err) => {
//     console.log('コールバックの中だよ！');
//     if (err) throw err;
// });

try {
    fs.mkdirSync(dirName);
    fs.writeFileSync(`${dirName}/index.html`, '');
    fs.writeFileSync(`${dirName}/app.js`, '');
    fs.writeFileSync(`${dirName}/styles.css`, '');
} catch(e) {
    console.log('問題が発生しました！！！');
    console.log(e);
}
