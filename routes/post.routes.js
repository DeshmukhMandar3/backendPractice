const express = require("express");
const postModel = require("../models/posts.models");
const authenticate = require("../middlewares/authenticate.middleware");

const postRouter = express();

postRouter.get("/get", authenticate, async (req, res, next) => {
  try {
    let data = await postModel.find();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

postRouter.post("/add", authenticate, async (req, res, next) => {
  let post = req.body;
  try {
    let data = new postModel(post);
    await data.save();
    res.send("Post Added Successfully!");
  } catch (err) {
    next(err);
  }
});

module.exports = postRouter;
