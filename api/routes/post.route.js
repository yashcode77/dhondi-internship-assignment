import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletepost, getposts, updatepost } from '../controllers/post.controller.js';

const router = express.Router();

// router.post('/create', verifyToken, create)
router.post('/create', create)
router.get('/getposts', getposts)
router.delete('/deletepost/:postId', deletepost)
router.put('/updatepost/:postId', updatepost)

router.get('/getposts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        // Fetch the post from the database using the postId
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Return the post details
        res.status(200).json(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


export default router;