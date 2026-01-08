const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
title: String,
description: String,
industry: String,
eventType: String,
date: Date,
location: String,
banner: String,
createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});


module.exports = model('Event', eventSchema);