'use strict';

const mongoose = require('mongoose');

const StartovneSchema = new mongoose.Schema(
  {
    predem: { type: Number, required: true },
    naMiste: { type: Number, required: true }
  },
  { _id: false, bufferCommands: false }
);

module.exports = StartovneSchema;
