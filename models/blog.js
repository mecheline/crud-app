const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

module.exports = mongoose.model("Blog", blogSchema);
