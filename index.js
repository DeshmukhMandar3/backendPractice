const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const userRouter = require("./routes/userRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/user", userRouter);

app.use("/", (req, res) => {
  res.send("Home Routes");
});

app.listen(8080, async () => {
  console.log("server has been started");
  try {
    await connection;
    console.log("connected to db");
  } catch (err) {
    console.log(err);
  }
});
