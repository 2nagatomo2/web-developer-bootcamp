// XHRを使った処理
// const req = new XMLHttpRequest();

// req.onload = function () {
//   console.log("成功！");
//   const data = JSON.parse(this.responseText);
//   console.log(data.name, data.height);
// };

// req.onerror = function () {
//   console.log("エラー！");
//   console.log(this);
// };

// req.open("GET", "https://swapi.dev/api/people/1/");
// req.send();

// fetch promiseをサポートしている
// fetch("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     // HTTPヘッダーが読み込まれた時にここの処理が走る．
//     // bodyが取得できているかはわからない
//     console.log("成功");
//     console.log(res);

//     // json()メソッドでbodyのPromiseを取得できる
//     return res.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async awaitを使う
// async function loadStarWarsPeople(url) {
//   try {
//     const res = await fetch(url);
//     const data = await res.json();
//     console.log(data);
//   } catch (e) {
//     console.log(e);
//   }
// }

// loadStarWarsPeople("https://swapi.dev/api/people/1/");
// loadStarWarsPeople("https://swapi.dev/api/people/2/");

// axios は最初にpromiseが得られた時点でresponseのbodyが得られる

// axios
//   .get("https://swapi.dev/api/people/1/")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {});

const getStarWarsPerson = async (id) => {
  try {
    const res = await axios.get(`https://swapi.dev/api/people/${id}/`);
    console.log(res.data);
  } catch (e) {
    console.log(e);
  }
};

// getStarWarsPerson(1);

const button = document.querySelector("button");
const jokes = document.querySelector("#jokes");
const getDatJoke = async () => {
  const config = {
    headers: {
      accept: "application/json",
    },
  };
  try {
    res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke;
  } catch (e) {
    console.log(e);
    return "No Jokes Sorry!!";
  }
};

button.addEventListener("click", async () => {
  const li = document.createElement("li");
  const joke = await getDatJoke();
  li.append(joke);
  jokes.appendChild(li);
});
