const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, enum: ['Once daily', 'Twice daily', 'Thrice daily', 'Weekly', 'As needed'], required: true },
  timing: [{ type: String, enum: ['Morning', 'Afternoon', 'Evening', 'Night', 'With meals', 'Before meals', 'After meals'] }],
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  reminderEnabled: { type: Boolean, default: true },
  reminderTimes: [String], // e.g. ["08:00", "20:00"]
  prescribedBy: { type: String },
  notes: { type: String },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Medication', medicationSchema);
