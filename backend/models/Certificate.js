const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: String,
  category: String,
  issueDate: String,
  description: String,
  certificateURL: String,
  verifyLink: String
}, { timestamps: true });

// Convert _id to id for frontend compatibility
certificateSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Certificate', certificateSchema);