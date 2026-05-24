const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const communityPostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: {
    type: String,
    enum: ['General', 'Nutrition', 'Labor & Delivery', 'Postpartum', 'Baby Care', 'Mental Health', 'Experiences'],
    default: 'General',
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('CommunityPost', communityPostSchema);
