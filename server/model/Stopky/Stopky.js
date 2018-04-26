'use strict';

const mongoose = require('mongoose');

const StopkySchema = new mongoose.Schema(
  {
    typ: {
      type: String,
      enum: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka'],
      required: true
    },
    base: { type: Date }, // when Stopky running
    delta: { type: String }, // when Stopky not running
    running: { type: Boolean, required: true }
  },
  { bufferCommands: false, usePushEach: true }
);

module.exports = mongoose.model('Stopky', StopkySchema);
