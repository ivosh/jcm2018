'use strict';

const mongoose = require('mongoose');
const UdajeSchema = require('./Udaje');
const PrihlaskaSchema = require('./Prihlaska');

const UcastSchema = new mongoose.Schema({
  ucastnikId: { type: Number, required: true, index: true },
  rok: { type: Number, required: true, index: true },
  udaje: { type: UdajeSchema, required: true },
  prihlaska: { type: PrihlaskaSchema }
});

module.exports = mongoose.model('Ucast', UcastSchema);
