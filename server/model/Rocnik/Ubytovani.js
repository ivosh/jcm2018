'use strict';

const mongoose = require('mongoose');

const UbytovaniSchema = new mongoose.Schema(
  {
    den: { type: String, enum: ['pátek', 'sobota'], required: true },
    poplatek: { type: Number, required: true }
  },
  { _id: false, bufferCommands: false }
);

module.exports = UbytovaniSchema;
