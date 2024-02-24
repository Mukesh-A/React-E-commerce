const express = require("express");
const { fetchBrands } = require("../controller/Brand");

const router = express.Router();

// /brands is already in base
router.get("/", fetchBrands);

exports.router = router;
