const mg = require("mongoose");

const postSchema = mg.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: String, required: true },
});

const postModel = mg.model("post", postSchema);

module.exports = postModel;
