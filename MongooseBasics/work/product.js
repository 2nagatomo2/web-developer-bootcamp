const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("接続完了");
  })
  .catch(() => {
    console.log("コネクションエラー");
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 10,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "priceは0より大きい値にしてください"],
  },
  onSale: {
    type: Boolean,
    required: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
  },
});

productSchema.methods.addCategory = function () {
  this.categories.push("on sale");
};

productSchema.methods.deleteCategory = function () {
  console.log(this.categories);
  this.categories.splice(this.categories.indexOf("on sale"));
};

productSchema.methods.toggleOnSale = function () {
  if (this.onSale) this.deleteCategory();
  else this.addCategory();
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.statics.fireSale = function () {
  return this.updateMany({}, { onSale: true, price: 0 });
};

const Product = mongoose.model("Product", productSchema);

// const bike = new Product({
//   name: "空気入れ",
//   price: 1980,
//   categories: ["サイクリング"],
// });

// bike
//   .save()
//   .then((data) => {
//     console.log("成功!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("エラー");
//     console.log(err.name.properties.message);
//   });

// Product.findOneAndUpdate(
//   { name: "空気入れ" },
//   { price: 2980 },
//   { new: true, runValidators: true }
// )
//   .then((data) => {
//     console.log("成功!");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("エラー");
//     console.log(err);
//   });

// const findProduct = async () => {
//   const foundProduct = await Product.findOne({ name: "マウンテンバイク" });
//   console.log(foundProduct);
//   await foundProduct.toggleOnSale();
//   console.log(foundProduct);
// };

// findProduct();

Product.fireSale().then((msg) => {
  console.log(msg);
});
