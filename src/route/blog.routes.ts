import express from 'express';
import BlogModel, { Blog } from '../model/blog.model';
import { successResponse, errorResponse } from '../helper/format';
import { upload } from '../helper/imageUpload';
import { addBlogValidation, updateBlogValidation } from '../helper/blog.validation';

const router = express.Router();

  // get all  blogs
  router.get('/blogs', async (req, res) => {
    try {
      const blogs = await BlogModel.find();
      return successResponse(res, blogs, 200, 'blogs fetched successfully');
    } catch (error: any) {
        console.log(error.message);
        return errorResponse(res, "something went wrong", 500, error.message);
    }
  });
  
  // get a single blog by ID
  router.get('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const blog = await BlogModel.findById(id);
      if (!blog) {
        return errorResponse(res, "blog not found", 404);
      } else {
        return successResponse(res, blog, 200, 'blog fetched successfully');
      }
    } catch (error: any) {
        console.log(error.message);
        return errorResponse(res, "something went wrong", 500, error.message);
    }
  });
  
  // create a new blog
  router.post('/blogs', upload.single('image'), async (req, res) => {
    const { error } = addBlogValidation(req.body);
    if(error) {
        return errorResponse(res, "input data in proper format", 406);
    }
    const { title, content, author, tags }: Blog = req.body;
    const image : any = req.file?.path;
    try {
      const newBlog = await BlogModel.create({
        title,
        content,
        image,
        author,
        tags,
      });
      return successResponse(res, newBlog, 200, 'blog added successfully');
    } catch (error: any) {
        console.log(error.message);
        return errorResponse(res, "something went wrong", 500, error.message);
    }
  });
  
  // update a blog by ID
  router.put('/blogs/:id', upload.single('image'), async (req, res) => {
    const { error } = updateBlogValidation(req.body);
    if(error) {
        return errorResponse(res, "data is not in proper format", 406);
    }
    const id = req.params.id;
    const { title, content, author, tags }: Blog = req.body;
    const image : any = req.file?.path;
    try {
      const updatedBlog = await BlogModel.findByIdAndUpdate(
        id,
        {
          title,
          content,
          image,
          author,
          tags,
        },
        { new: true }
      );
      if (!updatedBlog) {
        return errorResponse(res, "blog not found", 404);
      } else {
        return successResponse(res, updatedBlog, 200, 'blog updated successfully');
      }
    } catch (error:any) {
        console.log(error.message);
        return errorResponse(res, "something went wrong", 500, error.message);
    }
  });
  
  // delete a blog by ID
  router.delete('/blogs/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const deletedBlog = await BlogModel.findByIdAndDelete(id);
      if (!deletedBlog) {
        return errorResponse(res, "blog not found", 404);
      } else {
        return successResponse(res, deletedBlog, 200, 'blog deleted successfully');
      }
    } catch (error: any) {
        console.log(error.message);
        return errorResponse(res, "something went wrong", 500, error.message);
    }
  });
  

export default router;
