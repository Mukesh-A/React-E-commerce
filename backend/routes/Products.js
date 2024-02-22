const express = require("express");
const { createProduct } = require("../controller/Product");

const router = express.Router();

// /products is already in base 
router.post("/", createProduct);

exports.router = router;
