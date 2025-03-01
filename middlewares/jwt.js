const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../constants");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ status: "FAIL", error: "Access Denied. No token provided." });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.log("err", error);
    return res.status(400).send({ status: "FAIL", error: "Invalid Token." });
  }
};

module.exports = { authenticate };