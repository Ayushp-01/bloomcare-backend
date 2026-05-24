const express = require('express');
const Appointment = require('../models/Appointment');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET /api/appointments
router.get('/', protect, async (req, res) => {
  try {
    const { status } = req.query;
    const query = { user: req.user._id };
    if (status) query.status = status;
    const appointments = await Appointment.find(query).sort({ date: 1 });
    res.json(appointments);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// GET /api/appointments/upcoming
router.get('/upcoming', protect, async (req, res) => {
  try {
    const appointments = await Appointment.find({
      user: req.user._id, date: { $gte: new Date() }, status: 'Upcoming'
    }).sort({ date: 1 }).limit(5);
    res.json(appointments);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/appointments
router.post('/', protect, async (req, res) => {
  try {
    const appt = await Appointment.create({ ...req.body, user: req.user._id });
    res.status(201).json(appt);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PATCH /api/appointments/:id
router.patch('/:id', protect, async (req, res) => {
  try {
    const appt = await Appointment.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true });
    if (!appt) return res.status(404).json({ message: 'Appointment not found' });
    res.json(appt);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// DELETE /api/appointments/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Appointment.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ message: 'Appointment deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
