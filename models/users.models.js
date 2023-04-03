const mg = require("mongoose");

const userSchema = mg.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, requried: true },
    email: { type: String, requried: true },
    password: { type: String, requried: true },
  },
  { versionKey: false }
);

const userModel = mg.model("user", userSchema);

module.exports = userModel;
