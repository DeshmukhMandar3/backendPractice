const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.send("Please Login First");
  }
  try {
    let match = jwt.verify(token, "masai");
    if (match) {
      req.body.userId = match.id;
      next();
    } else {
      res.send("Invalid Token");
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
