const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  originalText: { type: String, required: true },
  summarizedText: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  userName: { type: String, required: true },
});

const Summary = mongoose.model('Summary', summarySchema);

module.exports = Summary;
