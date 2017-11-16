'use strict';

const mongoose = require('mongoose');

const PlatbaSchema = new mongoose.Schema(
  {
    zaplaceno: { type: Number, required: true },
    datum: { type: Date, required: true }
  },
  { _id: false, bufferCommands: false }
);

module.exports = PlatbaSchema;
