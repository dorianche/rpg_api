const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdeaSchema = new Schema(
  {
    title: String,
    description: String,
    type: String,
    published: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Idea", IdeaSchema);
