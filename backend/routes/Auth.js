const express = require("express");
const { createUser, loginUser } = require("../controller/Auth");
const passport = require("passport");

const router = express.Router();

// /auth is already in base
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);

exports.router = router;
