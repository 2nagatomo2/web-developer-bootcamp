// この方法では，ページが読み込まれた後に追加された要素に対して処理がされない．
// const listItems = document.querySelectorAll("li");
// for (let li of listItems) {
//   li.addEventListener("click", function () {
//     li.remove();
//   });
// }

const postForm = document.querySelector("#postForm");
const posts = document.querySelector("#posts");

postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userNameInput = this.elements.userName;
  const contentInput = this.elements.content;

  const newPost = document.createElement("li");
  const bTag = document.createElement("b");
  bTag.append(userNameInput.value);
  newPost.append(bTag);
  newPost.append(` - ${contentInput.value}`);

  posts.appendChild(newPost);
  userNameInput.value = "";
  contentInput.value = "";
});

posts.addEventListener("click", function (e) {
  if (e.target.nodeName === "LI") {
    e.target.remove();
  } else if (e.target.nodeName === "B") {
    e.target.parentElement.remove();
  }
});
