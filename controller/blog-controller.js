const Blog = require("../models/blog");

const fetchAllBlogs = async (req, res) => {
  try {
    const response = await Blog.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
};

const createBlog = async (req, res) => {
  console.log(req.body);
  try {
    const newBlogPost = new Blog({
      title: req.body.title,
      body: req.body.body,
    });
    const result = await newBlogPost.save();
    res.status(201).json({ message: "New blog post created" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  fetchAllBlogs,
  createBlog,
};
