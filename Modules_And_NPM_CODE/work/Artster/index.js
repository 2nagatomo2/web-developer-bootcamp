const figlet = require("figlet");
const colors = require("colors");

figlet("Hello World!!", function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data.rainbow);
  }
});
