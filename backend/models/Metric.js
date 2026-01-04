const mongoose = require('mongoose');

const metricSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Number, default: 0 }
}, { timestamps: true });

metricSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  }
});

module.exports = mongoose.model('Metric', metricSchema);
