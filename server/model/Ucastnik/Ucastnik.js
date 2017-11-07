'use strict';

const mongoose = require('mongoose');
const UcastSchema = require('./Ucast');

const UcastnikSchema = new mongoose.Schema({
  ucasti: [UcastSchema]
});

module.exports = mongoose.model('Ucastnik', UcastnikSchema);
