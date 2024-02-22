const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRouters = require("./routes/Products");
dotenv.config();

//middleware
server.use(express.json());
server.use("/products", productRouters.router);

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
