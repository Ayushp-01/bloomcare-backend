const mongoose = require('mongoose');

const scanDetailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scanType: { type: String, enum: ['NT Scan', 'Anomaly Scan', 'Growth Scan', 'Doppler', 'Other'], required: true },
  scanDate: { type: Date, required: true },
  week: { type: Number }, // pregnancy week
  findings: { type: String },
  hospital: { type: String },
  doctor: { type: String },
  imageUrl: { type: String }, // optional scan image URL
  notes: { type: String },
}, { timestamps: true });

const vaccineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vaccineName: { type: String, required: true },
  scheduledDate: { type: Date },
  administeredDate: { type: Date },
  status: { type: String, enum: ['Pending', 'Done', 'Skipped'], default: 'Pending' },
  notes: { type: String },
}, { timestamps: true });

module.exports = {
  ScanDetail: mongoose.model('ScanDetail', scanDetailSchema),
  Vaccine: mongoose.model('Vaccine', vaccineSchema),
};
