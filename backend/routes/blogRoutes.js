import  express from 'express';
import {
    getAllBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    getBlogById
} from '../controllers/blogControllers.js';
import {authMiddleware} from '../middleware/authMiddleware.js'

const router = express.Router();

router.get('/',getAllBlogs);
router.get('/:id',getBlogById);
router.post('/create',authMiddleware,createBlog);
router.put('/:id',authMiddleware,updateBlog);
router.delete('/:id',authMiddleware,deleteBlog);

export default router;