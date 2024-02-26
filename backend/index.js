const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRouters = require("./routes/Products");
const brandRouters = require("./routes/Brands");
const categoriesRouters = require("./routes/Categories");
const cors = require("cors");
dotenv.config();

//middleware
server.use(cors());
server.use(express.json());
server.use("/products", productRouters.router);
server.use("/brands", brandRouters.router);
server.use("/categories", categoriesRouters.router);

server.get("/", (req, res) => {
  res.send({ status: "success" });
});

// server

// Database connection
const MONGODB_URL = process.env.MONGO_URL;
const port = process.env.PORT;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server Running in port ${port}`);
    });
  })
  .catch((err) => console.log(err));
