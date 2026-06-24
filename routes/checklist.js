const express = require('express');
const Checklist = require('../models/Checklist');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/checklist
router.get('/', protect, async (req, res) => {
  try {
    const items = await Checklist.find({ user: req.user._id }).sort({ createdAt: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/checklist
router.post('/', protect, async (req, res) => {
  try {
    const { tab, text, completed } = req.body;
    const item = await Checklist.create({
      user: req.user._id,
      tab: tab || 'Custom',
      text,
      completed: completed || false
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/checklist/:id
router.put('/:id', protect, async (req, res) => {
  try {
    const { text, completed, tab } = req.body;
    const item = await Checklist.findOne({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    
    if (text !== undefined) item.text = text;
    if (completed !== undefined) item.completed = completed;
    if (tab !== undefined) item.tab = tab;
    
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/checklist/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Checklist.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/checklist/sync
// Optional: Sync endpoint if needed to migrate local storage
router.post('/sync', protect, async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items)) return res.status(400).json({ message: 'Invalid format' });
    
    // Add missing items
    const inserted = [];
    for (let it of items) {
      const existing = await Checklist.findOne({ user: req.user._id, text: it.text, tab: it.tab });
      if (!existing) {
        const newItem = await Checklist.create({
          user: req.user._id,
          tab: it.tab,
          text: it.text,
          completed: it.completed
        });
        inserted.push(newItem);
      }
    }
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
