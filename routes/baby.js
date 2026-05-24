const express = require('express');
const { KickCounter, Vaccine } = require('../models/ScanDetail');
const KickCounterModel = require('../models/KickCounter');
const Contraction = require('../models/Contraction');
const { ScanDetail } = require('../models/ScanDetail');
const { protect } = require('../middleware/auth');
const router = express.Router();

// --- Kick Counter ---
router.get('/kicks', protect, async (req, res) => {
  const kicks = await KickCounterModel.find({ user: req.user._id }).sort({ date: -1 }).limit(10);
  res.json(kicks);
});
router.post('/kicks', protect, async (req, res) => {
  const session = await KickCounterModel.create({ ...req.body, user: req.user._id });
  res.status(201).json(session);
});

// --- Contractions ---
router.get('/contractions', protect, async (req, res) => {
  const sessions = await Contraction.find({ user: req.user._id }).sort({ sessionDate: -1 }).limit(10);
  res.json(sessions);
});
router.post('/contractions', protect, async (req, res) => {
  const session = await Contraction.create({ ...req.body, user: req.user._id });
  res.status(201).json(session);
});

// --- Scans ---
router.get('/scans', protect, async (req, res) => {
  const scans = await ScanDetail.find({ user: req.user._id }).sort({ scanDate: -1 });
  res.json(scans);
});
router.post('/scans', protect, async (req, res) => {
  const scan = await ScanDetail.create({ ...req.body, user: req.user._id });
  res.status(201).json(scan);
});
router.delete('/scans/:id', protect, async (req, res) => {
  await ScanDetail.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: 'Scan deleted' });
});

// --- Vaccines ---
router.get('/vaccines', protect, async (req, res) => {
  const vaccines = await Vaccine.find({ user: req.user._id }).sort({ scheduledDate: 1 });
  res.json(vaccines);
});
router.post('/vaccines', protect, async (req, res) => {
  const vaccine = await Vaccine.create({ ...req.body, user: req.user._id });
  res.status(201).json(vaccine);
});
router.patch('/vaccines/:id', protect, async (req, res) => {
  const vaccine = await Vaccine.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
  res.json(vaccine);
});

module.exports = router;
