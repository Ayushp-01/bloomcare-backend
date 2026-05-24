const mongoose = require('mongoose');

const contractionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sessionDate: { type: Date, default: Date.now },
  contractions: [{
    startTime: Date,
    endTime: Date,
    durationSecs: Number,
    intervalSecs: Number,
  }],
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Contraction', contractionSchema);
