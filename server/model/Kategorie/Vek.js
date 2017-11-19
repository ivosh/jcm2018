'use strict';

const mongoose = require('mongoose');

const VekSchema = new mongoose.Schema(
  {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    presne: { type: Boolean }
  },
  { _id: false, bufferCommands: false }
);

module.exports = VekSchema;
