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
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTA0MDgzZGViNmZhMjhkM2Q1MzQwOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTE5NTQ4MX0.IS_YP_BfRf7rr9fLvZ5BVZV1OPZOrQ_qpnLF7x8VQ6I";
  return token;
};
