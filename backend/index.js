const express = require("express");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { isAuth, sanitizerUser, cookieExtractor } = require("./service/common");

//jwt
const SECRET_KEY = "SECRET_KEY";
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

var opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;
const { User } = require("./model/User");

server.use(express.static("build"));
server.use(cookieParser());

//routers
const productRouters = require("./routes/Products");
const brandRouters = require("./routes/Brands");
const categoriesRouters = require("./routes/Categories");
const usersRouters = require("./routes/Users");
const authRouters = require("./routes/Auth");
const cartRouters = require("./routes/Cart");
const orderRouters = require("./routes/Order");

//env
const dotenv = require("dotenv");
dotenv.config();

mongoose.set("strictQuery", true);

//middleware

//passport

server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));
// we are using exposedHeaders because in frontend we have used X-Total-Count from the header request to count number of items from the request . so when we are doing that in backend we have to use exposedHeaders to expose the X-Total-Count so properly the pagination will be displayed

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());

server.use("/users", isAuth(), usersRouters.router);
server.use("/auth", authRouters.router);
server.use("/products", isAuth(), productRouters.router);
server.use("/brands", isAuth(), brandRouters.router);
server.use("/categories", isAuth(), categoriesRouters.router);
server.use("/cart", isAuth(), cartRouters.router);
server.use("/orders", isAuth(), orderRouters.router);

server.get("/", (req, res) => {
  res.send({ status: "success" });
});

// passport strategies
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        done(null, false, { message: "invalid credentials" });
      }

      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizerUser(user), SECRET_KEY);

          done(null, { id: user.id, role: user.role }); // this is send to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

// jwt strategies
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizerUser(user)); //this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// this create session variable req.user on being called from callback
passport.serializeUser(function (user, cb) {
  console.log("serializeUser", user);
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

// this create session variable req.user on being called from authorized request
passport.deserializeUser(function (user, cb) {
  console.log("de-serializeUser", user);

  process.nextTick(function () {
    return cb(null, user);
  });
});

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
