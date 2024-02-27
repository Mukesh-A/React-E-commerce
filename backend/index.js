const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//routers
const productRouters = require("./routes/Products");
const brandRouters = require("./routes/Brands");
const categoriesRouters = require("./routes/Categories");
const usersRouters = require("./routes/Users");
const authRouters = require("./routes/Auth");

const server = express();
//env
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", true);


//middleware
// we are using exposedHeaders because in frontend we have used X-Total-Count from the header request to count number of items from the request . so when we are doing that in backend we have to use exposedHeaders to expose the X-Total-Count so properly the pagination will be displayed
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());

server.use("/users", usersRouters.router);
server.use("/auth", authRouters.router);
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
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server Running in port ${port}`);
    });
  })
  .catch((err) => console.log(err));
