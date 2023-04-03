const express = require("express");
const userModel = require("../models/users.models");

const userRouter = express.Router();

userRouter.get("/get", async (req, res, next) => {
  try {
    const data = await userModel.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/register", async (req, res, next) => {
  const user = req.body;
  const { email, password } = user;
  try {
    const users = await userModel.find({ email });
    if (users.length > 0) {
      res.send("User Already Exists, Kindly Do Login");
    } else {
      try {
        const data = new userModel(user);
        await data.save();
        res.send("Added new User");
      } catch (err) {
        next(err);
      }
    }
  } catch (err) {
    next(err);
  }
});

userRouter.post("/login", async (req, res, next) => {
  const user = req.body;

  const { email, password } = user;
  try {
    const users = await userModel.find({ email });
    if (users.length > 0) {
      users.forEach((el) => {
        if (el.email == email && el.password == password) {
          res.send(`Login Successful! ${el.name}`);
        }
      });
      res.send("Wrong Password!");
    } else {
      res.send("Invalid Email or Password");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = userRouter;
