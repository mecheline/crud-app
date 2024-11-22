const express = require("express");
const { fetchAllBlogs, createBlog } = require("../controller/blog-controller");
const router = express.Router();

router.get("/", fetchAllBlogs);
router.post("/", createBlog);

module.exports = router;
