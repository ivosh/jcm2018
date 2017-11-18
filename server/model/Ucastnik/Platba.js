'use strict';

const mongoose = require('mongoose');

const PlatbaSchema = new mongoose.Schema(
  {
    castka: { type: Number, required: true },
    datum: { type: Date, required: true },
    typ: { type: String, enum: ['hotově', 'přes účet', 'složenkou'], required: true }
  },
  { _id: false, bufferCommands: false }
);

module.exports = PlatbaSchema;
