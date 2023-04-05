const userModel = require("../models/users.models");

const userExists = async (req, res, next) => {
  let user = req.body;

  try {
    let data = await userModel.find(user);
    console.log(data);
    if (data.length > 0) {
      res.send("User Already Exists, Kindly Login!");
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = userExists;
