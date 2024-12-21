const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
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
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  (req, res, next) => {
    next();
  },
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // TODO: returnTo の実装が正しくない
    req.flash("success", "おかえりなさい！！");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  }
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "ログアウトに失敗しました。");
      return req.redirect("/campgrouds");
    }
    req.flash("success", "ログアウトしました。");
    res.redirect("/campgrounds");
  });
});

module.exports = router;
