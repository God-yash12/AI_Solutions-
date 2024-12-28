const express = require('express');
const blogRouter = express.Router();
const controller = require('../controller/blogController');
const upload = require ('../middleware/imageMiddleware');

blogRouter.post('/create-blog', upload.single('image'), controller.postBlog );
blogRouter.get("/get-blogs", controller.getAllBlogs)
blogRouter.delete("/delete-blog/:id", controller.deleteBlog)
blogRouter.get("/get-blog/:id", controller.getBlogById)
blogRouter.get("/total-blog", controller.getTotalBlogs)

module.exports = blogRouter;