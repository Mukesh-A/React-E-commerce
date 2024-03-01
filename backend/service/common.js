const passport = require("passport");

exports.isAuth = (req, re, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizerUser = (user) => {
  return { id: user.id, role: user.role };
};
exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  // token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTA2OGMzYjA3ZDRlZmIwZTNkZmE5YSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5MjA1NzAwfQ.J3tCasPscQZlBbcAAtCDP7Yp9l9Zaqrgtb2_1zuON1s";
  return token;
};
