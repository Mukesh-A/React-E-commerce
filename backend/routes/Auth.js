const express = require("express");
const { createUser } = require("../controller/Auth");

const router = express.Router();

// /auth is already in base
router.post("/signup", createUser);

exports.router = router;
