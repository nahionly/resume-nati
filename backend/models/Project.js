const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tech: [String],
  image: String,
  videoUrl: String,
  githubUrl: String,
  liveUrl: String
}, { timestamps: true });

// Convert _id to id for frontend compatibility
projectSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Project', projectSchema);
