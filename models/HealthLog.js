const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  type: {
    type: String,
    enum: ['symptom', 'sleep', 'diet', 'exercise', 'vitals', 'baby_movement', 'mood'],
    required: true,
  },
  data: {
    // vitals
    sugarLevel: Number,
    systolic: Number,
    diastolic: Number,
    weight: Number,
    // sleep
    sleepHours: Number,
    sleepQuality: { type: String, enum: ['Poor', 'Fair', 'Good', 'Excellent'] },
    // diet
    meals: [{ name: String, calories: Number, time: String }],
    waterIntake: Number, // liters
    // exercise
    exerciseType: String,
    durationMins: Number,
    // symptoms
    symptoms: [{ name: String, severity: { type: String, enum: ['Mild', 'Moderate', 'Severe'] } }],
    // baby
    kickCount: Number,
    // mood
    mood: { type: String, enum: ['Happy', 'Anxious', 'Sad', 'Tired', 'Energetic', 'Irritable'] },
  },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('HealthLog', healthLogSchema);
