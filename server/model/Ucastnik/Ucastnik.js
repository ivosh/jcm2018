'use strict';

const mongoose = require('mongoose');
const PoharSchema = require('./Pohar');
const UcastSchema = require('./Ucast');

const UcastnikSchema = new mongoose.Schema(
  {
    ucasti: [UcastSchema],
    pohar: { type: PoharSchema }
  },
  { bufferCommands: false, usePushEach: true }
);

module.exports = mongoose.model('Ucastnik', UcastnikSchema);
