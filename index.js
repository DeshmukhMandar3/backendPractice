const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/user.routes");
const postRouter = require("./routes/post.routes");
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/post", postRouter);

app.use("/", (req, res) => {
  res.send("Home Route");
});

app.listen(process.env.server_port, async () => {
  try {
    await connection;
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
  console.log("server started at 8080");
});
