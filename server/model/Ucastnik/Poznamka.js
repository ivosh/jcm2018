'use strict';

const mongoose = require('mongoose');

const PoznamkaSchema = new mongoose.Schema(
  {
    datum: { type: Date, required: true },
    text: { type: String },
  },
  { _id: false, bufferCommands: false }
);

module.exports = PoznamkaSchema;
