const mongoose = require('mongoose');

const kickCounterSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  kicks: [{ timestamp: { type: Date, default: Date.now } }],
  totalKicks: { type: Number, default: 0 },
  durationMins: { type: Number },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('KickCounter', kickCounterSchema);
