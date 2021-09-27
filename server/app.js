const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(morgan("dev"));
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
app.use(express.json());
app.use(cookieParser());
app.use(
    expressSession({
      secret: "somethingSecret",
      saveUninitialized: false,
      resave: false,
    })
  );

  const mongoose = require("mongoose");
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB is connected 😎"))
  .catch((error) => {
    console.log(`There was a problem ${error.message}`);
  });

  app.use("/uploads", express.static("uploads"));

app.route("/users").get(async (req, res) => {
  const users = ["Nancy", "Zain", "Jack", "Olga"];
  res.status(200).json(users);
});

module.exports = app;