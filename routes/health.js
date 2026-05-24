const express = require('express');
const HealthLog = require('../models/HealthLog');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/health?type=vitals&limit=30
router.get('/', protect, async (req, res) => {
  try {
    const { type, limit = 30 } = req.query;
    const query = { user: req.user._id };
    if (type) query.type = type;
    const logs = await HealthLog.find(query).sort({ date: -1 }).limit(Number(limit));
    res.json(logs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/health
router.post('/', protect, async (req, res) => {
  try {
    const log = await HealthLog.create({ ...req.body, user: req.user._id });
    res.status(201).json(log);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE /api/health/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await HealthLog.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Log deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/health/summary
router.get('/summary', protect, async (req, res) => {
  try {
    const last7 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const logs = await HealthLog.find({ user: req.user._id, date: { $gte: last7 } });
    const summary = {
      totalLogs: logs.length,
      vitals: logs.filter(l => l.type === 'vitals').length,
      symptoms: logs.filter(l => l.type === 'symptom').length,
      sleep: logs.filter(l => l.type === 'sleep').length,
      diet: logs.filter(l => l.type === 'diet').length,
      exercise: logs.filter(l => l.type === 'exercise').length,
    };
    res.json(summary);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
