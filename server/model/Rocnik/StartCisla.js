'use strict';

const mongoose = require('mongoose');

const StartCislaSchema = new mongoose.Schema(
  {
    rozsahy: [{ type: String, required: true }],
    barva: { type: String },
  },
  { _id: false, bufferCommands: false }
);

module.exports = StartCislaSchema;
