'use strict';

const mongoose = require('mongoose');
const UdajeSchema = require('./Udaje');
const PrihlaskaSchema = require('./Prihlaska');

const UcastSchema = new mongoose.Schema(
  {
    rok: { type: Number, required: true, index: true },
    udaje: { type: UdajeSchema, required: true },
    prihlaska: { type: PrihlaskaSchema }
  },
  { _id: false, bufferCommands: false }
);

module.exports = UcastSchema;
