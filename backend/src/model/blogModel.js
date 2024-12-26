const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  time: { type: Date, default: Date.now, required: true },
  image: { type: String, required: false },
  content: { type: String, required: true },
});

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
