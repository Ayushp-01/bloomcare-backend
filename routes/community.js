const express = require('express');
const CommunityPost = require('../models/CommunityPost');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/community?category=General
router.get('/', async (req, res) => {
  try {
    const { category, limit = 20, page = 1 } = req.query;
    const query = {};
    if (category) query.category = category;
    const posts = await CommunityPost.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));
    res.json(posts);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/community
router.post('/', protect, async (req, res) => {
  try {
    const post = await CommunityPost.create({ ...req.body, user: req.user._id, authorName: req.user.name });
    res.status(201).json(post);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/community/:id/like
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    const liked = post.likes.includes(req.user._id);
    if (liked) post.likes.pull(req.user._id);
    else post.likes.push(req.user._id);
    await post.save();
    res.json({ likes: post.likes.length, liked: !liked });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/community/:id/comment
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    post.comments.push({ user: req.user._id, authorName: req.user.name, content: req.body.content });
    await post.save();
    res.status(201).json(post.comments);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE /api/community/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await CommunityPost.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Post deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
