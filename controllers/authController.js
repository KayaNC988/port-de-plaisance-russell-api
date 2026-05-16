const passport = require("passport");

exports.login = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return res.redirect("/");
    }

    if (!user) {
      return res.redirect("/");
    }

    req.logIn(user, (error) => {
      if (error) {
        return res.redirect("/");
      }

      return res.redirect("/dashboard");
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};

exports.profile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      message: "Non authentifié",
    });
  }

  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
};