const express = require("express");
const { fetchCategories } = require("../controller/Category");


const router = express.Router();

// /categories is already in base
router.get("/", fetchCategories);

exports.router = router;
