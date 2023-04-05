const express = require("express");
const userModel = require("../models/users.models");
const userExists = require("../middlewares/userExists.middleware");
const jwt = require("jsonwebtoken");
const authenticate = require("../middlewares/authenticate.middleware");
require("dotenv").config();
const userRouter = express.Router();

userRouter.get("/getUser", authenticate, async (req, res, next) => {
  console.log(req.body);
  try {
    let data = await userModel.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/register", userExists, async (req, res, next) => {
  let user = req.body;
  try {
    let data = new userModel(user);
    await data.save();
    res.send("User Registered Successfully");
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let users = await userModel.find({ email });
    if (users.length > 0) {
      if (users[0].email == email && users[0].password == password) {
        let token = jwt.sign({ id: users[0].id }, process.env.key);
        res.send({ msg: "User Logged in Successfully", token });
      } else {
        res.send("Wrong Password");
      }
    } else {
      res.send("Wrong Email Id");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
