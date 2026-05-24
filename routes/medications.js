const express = require('express');
const Medication = require('../models/Medication');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/medications
router.get('/', protect, async (req, res) => {
  try {
    const { active } = req.query;
    const query = { user: req.user._id };
    if (active === 'true') query.isActive = true;
    const meds = await Medication.find(query).sort({ createdAt: -1 });
    res.json(meds);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/medications
router.post('/', protect, async (req, res) => {
  try {
    const med = await Medication.create({ ...req.body, user: req.user._id });
    res.status(201).json(med);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PATCH /api/medications/:id
router.patch('/:id', protect, async (req, res) => {
  try {
    const med = await Medication.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!med) return res.status(404).json({ message: 'Medication not found' });
    res.json(med);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE /api/medications/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Medication.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Medication deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
