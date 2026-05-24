const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  hospitalName: { type: String, required: true },
  doctorName: { type: String },
  appointmentType: {
    type: String,
    enum: ['Routine Checkup', 'Ultrasound', 'Blood Test', 'Gynecologist', 'Dentist', 'Other'],
    default: 'Routine Checkup',
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  notes: { type: String },
  reminderEnabled: { type: Boolean, default: true },
  reminderBefore: { type: Number, default: 60 }, // minutes before
  status: { type: String, enum: ['Upcoming', 'Completed', 'Cancelled'], default: 'Upcoming' },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);
