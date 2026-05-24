const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  dob: { type: Date },
  partnerName: { type: String },
  partnerEmail: { type: String },
  sugarLevel: { type: Number }, // mg/dL
  height: { type: Number }, // cm
  weight: { type: Number }, // kg
  bloodPressure: { systolic: Number, diastolic: Number },
  bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
  dueDate: { type: Date, required: true },
  trimester: { type: Number, enum: [1, 2, 3] },
  profilePicture: { type: String },
  region: { type: String, enum: ['North', 'South', 'East', 'West'], default: 'North' },
  dietPreference: { type: String, enum: ['Veg', 'Non-Veg'], default: 'Veg' },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
