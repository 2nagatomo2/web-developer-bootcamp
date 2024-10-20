const form = document.querySelector("#searchForm");
form.addEventListener("submit", async function (e) {
  // default で form が request を投げてしまうのを止める
  e.preventDefault();
  const searchTermInput = this.elements.query;
  const config = {
    params: {
      q: searchTermInput.value,
    },
  };
  try {
    const res = await axios.get("https://api.tvmaze.com/search/shows", config);
    makeImage(res.data);
  } catch (e) {
    return;
  }
  searchTermInput.value = "";
});

const makeImage = (results) => {
  for (let result of results) {
    if (result.show.image) {
      const img = document.createElement("IMG");
      img.src = result.show.image.medium;
      document.body.append(img);
    }
  }
};
