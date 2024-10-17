const postForm = document.querySelector("#postForm");
const posts = document.querySelector("#posts");

postForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userNameInput = this.elements.userName;
  const postInput = this.elements.post;
  addPost(userNameInput.value, postInput.value);

  userNameInput.value = "";
  postInput.value = "";
});

const addPost = (userName, post) => {
  const newPost = document.createElement("li");
  const bTag = document.createElement("b");
  bTag.append(userName);
  newPost.append(bTag);
  newPost.append(` - ${post}`);
  posts.appendChild(newPost);
};
