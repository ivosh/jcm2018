'use strict';

const mongoose = require('mongoose');
const UcastSchema = require('./Ucast');

const UcastnikSchema = new mongoose.Schema(
  {
    ucasti: [UcastSchema]
  },
  { bufferCommands: false, usePushEach: true }
);

module.exports = mongoose.model('Ucastnik', UcastnikSchema);
