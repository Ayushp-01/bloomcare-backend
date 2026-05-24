const express = require('express');
const Profile = require('../models/Profile');
const { protect } = require('../middleware/auth');
const router = express.Router();

/**
 * Parse a BP string like "120/80" into { systolic: 120, diastolic: 80 }.
 * Returns undefined if the string is missing or malformed.
 */
function parseBP(bp) {
  if (!bp || typeof bp !== 'string') return undefined;
  const [sys, dia] = bp.split('/').map(Number);
  if (!isNaN(sys) && !isNaN(dia)) return { systolic: sys, diastolic: dia };
  return undefined;
}

/**
 * Normalise raw onboarding/profile form data before saving:
 * - Converts `bp` string → `bloodPressure` object
 * - Converts `trimester` string → Number
 */
function normalise(body, userId) {
  const { bp, trimester, ...rest } = body;
  const data = { ...rest, user: userId };
  const parsed = parseBP(bp);
  if (parsed) data.bloodPressure = parsed;
  if (trimester !== undefined) data.trimester = Number(trimester);
  return data;
}

// GET /api/profile
router.get('/', protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.json(profile);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// POST /api/profile  – create or replace
router.post('/', protect, async (req, res) => {
  try {
    const data = normalise(req.body, req.user._id);
    let profile = await Profile.findOne({ user: req.user._id });
    if (profile) {
      profile = await Profile.findOneAndUpdate({ user: req.user._id }, data, { new: true, runValidators: true });
    } else {
      profile = await Profile.create(data);
    }
    res.status(201).json(profile);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PUT /api/profile  – upsert (used by ProfileContext.saveProfile)
router.put('/', protect, async (req, res) => {
  try {
    const data = normalise(req.body, req.user._id);
    const profile = await Profile.findOneAndUpdate(
      { user: req.user._id },
      data,
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true }
    );
    res.json(profile);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// PATCH /api/profile  – partial update
router.patch('/', protect, async (req, res) => {
  try {
    const data = normalise(req.body, req.user._id);
    const profile = await Profile.findOneAndUpdate({ user: req.user._id }, data, { new: true, runValidators: true });
    res.json(profile);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
