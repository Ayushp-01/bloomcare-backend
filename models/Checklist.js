const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tab: { type: String, required: true }, // 'T1', 'T2', 'T3', 'Hospital', 'Custom'
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Checklist', checklistSchema);
