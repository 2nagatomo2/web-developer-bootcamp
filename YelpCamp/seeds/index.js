const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("mongoDBコネクションOK！！");
  })
  .catch((err) => {
    console.log("コネクションエラー！！！");
    console.log(err);
  });

const randomIndexed = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 30; i++) {
    const randomTitle = `${randomIndexed(descriptors)}・${randomIndexed(
      places
    )}`;
    const randomCity = randomIndexed(cities);
    const price = Math.floor(Math.random() * 2000) + 1000;
    const camp = new Campground({
      title: randomTitle,
      price,
      description:
        "親譲りの無鉄砲で小供の時から損ばかりしている。小学校に居る時分学校の二階から飛び降りて一週間ほど腰を抜かした事がある。なぜそんな無闇をしたと聞く人があるかも知れぬ。別段深い理由でもない。新築の二階から首を出していたら、同級生の一人が冗談に、いくら威張っても、そこから飛び降りる事は出来まい。",
      location: `${randomCity.prefecture}${randomCity.city}`,
      images: [
        {
          url: "https://res.cloudinary.com/dlnli1y9c/image/upload/v1739531728/YelpCamp/byvfor4jxpnxsy6dhi7m.jpg",
          filename: "YelpCamp/byvfor4jxpnxsy6dhi7m",
        },
        {
          url: "https://res.cloudinary.com/dlnli1y9c/image/upload/v1739531728/YelpCamp/byvfor4jxpnxsy6dhi7m.jpg",
          filename: "YelpCamp/byvfor4jxpnxsy6dhi7m",
        },
      ],
      // "https://api.unsplash.com/photos/random?query=camping&client_id=cvWP9qKLAIiRApCMgfWsEQx-pHqD8ig3plksOmQapUw", // apiの使い方がようわからんかった
      author: "6766231357bb1707f4bd86d5",
    });
    await camp.save();
  }

  const data = await Campground.find({});
  console.log(data);
};

seedDB().then(() => {
  mongoose.connection.close();
});
