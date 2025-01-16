const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("register");
};

module.exports.renderLogin = (req, res) => {
  res.render("login");
};

module.exports.register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.flash("success", "Yelp Campへようこそ！");
    req.login(registeredUser, (err) => {
      if (err) {
        req.flash("error", "ログインに失敗しました");
        return req.redirect("/login");
      }
      return res.redirect("/campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};
module.exports.login = (req, res) => {
  // TODO: returnTo の実装が正しくない
  req.flash("success", "おかえりなさい！！");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "ログアウトに失敗しました。");
      return req.redirect("/campgrouds");
    }
    req.flash("success", "ログアウトしました。");
    res.redirect("/campgrounds");
  });
};
