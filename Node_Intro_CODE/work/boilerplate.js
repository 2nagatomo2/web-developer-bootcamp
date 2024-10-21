const fs = require("fs");
const dirName = process.argv[2] || "Project";

// fs.mkdir("newDir", { recursive: true }, (err) => {
//   console.log("コールバックの中");
//   if (err) throw err;
// });
try {
  fs.mkdirSync(dirName);
} catch (e) {
  //   console.log(e);
}
fs.writeFileSync(`${dirName}/index.html`, "");
fs.writeFileSync(`${dirName}/style.css`, "");
fs.writeFileSync(`${dirName}/app.js`, "");
