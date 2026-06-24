const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ['symptom', 'symptoms', 'sleep', 'diet', 'exercise', 'vitals', 'baby_movement', 'mood'],
    required: true,
  },
  data: { type: mongoose.Schema.Types.Mixed },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('HealthLog', healthLogSchema);
