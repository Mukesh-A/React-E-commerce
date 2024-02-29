const express = require("express");
const { fetchUserById, updateUser } = require("../controller/User");

const router = express.Router();

// /brands is already in base
router.get("/own", fetchUserById).patch("/:id", updateUser);

exports.router = router;
