'use strict';

const mongoose = require('mongoose');

const UbytovaniSchema = new mongoose.Schema(
  {
    poplatek: { type: Number, required: true },
  },
  { _id: false, bufferCommands: false }
);

module.exports = UbytovaniSchema;
