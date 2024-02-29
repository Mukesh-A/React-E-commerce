const { User } = require("../model/User");
const crypto = require("crypto");
const { sanitizerUser } = require("../service/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      "sha256",
      async function (err, hashedPassword) {
        const user = new User({ ...req.body, password: hashedPassword, salt });
        const doc = await user.save();

        req.login(sanitizerUser(doc), (err) => {
          if (err) {
            // this also calls serialization
            res.status(400).json(err);
          } else {
            const token = jwt.sign(sanitizerUser(doc), SECRET_KEY);
            res
              .cookie("jwt", token, {
                expires: new Date(Date.now() + 3600000),
                httpOnly: true,
              }) // 1 hr cookie will be valid

              .status(201)
              .json({ id: doc.id, role: doc.role });
          }
        });
      }
    );
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.loginUser = async (req, res) => {
  const user = req.user;
  console.log("checkAuth", req.user.token);
  res
    .cookie("jwt", req.user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    }) // 1 hr cookie will be valid.json(req.user);
    .status(201)
    .json(user.token);
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};
