'use strict';

const mongoose = require('mongoose');

const SentEmailSchema = new mongoose.Schema(
  {
    mailFrom: { type: String, required: true },
    mailTo: { type: String, required: true },
    subject: { type: String },
    date: { type: Date, required: true },
    success: { type: Boolean, required: true },
  },
  { _id: false, bufferCommands: false }
);

module.exports = SentEmailSchema;
