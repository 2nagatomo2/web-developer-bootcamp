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
  for (let i = 0; i < 50; i++) {
    const randomTitle = `${randomIndexed(descriptors)}・${randomIndexed(
      places
    )}`;
    const randomCity = randomIndexed(cities);
    const camp = new Campground({
      title: randomTitle,
      price: 10000,
      description: "サンプルの文章",
      location: `${randomCity.prefecture}${randomCity.city}`,
    });
    await camp.save();
  }

  const data = await Campground.find({});
  console.log(data);
};

seedDB().then(() => {
  mongoose.connection.close();
});
