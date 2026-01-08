const { Schema, model } = require('mongoose');

const newsletterSchema = new Schema({
  email: { type: String, unique: true, required: true },
  subscribedAt: { type: Date, default: Date.now }
});

module.exports = model('Newsletter', newsletterSchema);