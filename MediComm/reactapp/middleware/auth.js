const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token");
  //const token = req.cookies["token"];
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    //verifying token that has been set after login
    const decoded = jwt.verify(token, "randomString");
    req.user = decoded.user;
    req.patient = decoded.patient;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "token: " + token });
  }
};