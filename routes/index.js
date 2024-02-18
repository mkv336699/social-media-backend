var app = require('express')();
var usersRouter = require('./users');
const { authenticate } = require("../middlewares/jwt");
const authRoutes = require("./auth");

app.post("/", (req, res, next) => {
  setTimeout(() => {
    res.send({ "STATUS": "OK" });
  }, 100_000);
});

app.use("/auth", authRoutes);
app.use("/user", authenticate, usersRouter);

module.exports = app;
