'use strict';

const mongoose = require('mongoose');
const NarozeniSchema = require('./Narozeni');

const UdajeSchema = new mongoose.Schema(
  {
    prijmeni: { type: String, required: true },
    jmeno: { type: String, required: true },
    narozeni: { type: NarozeniSchema, required: true },
    pohlavi: { type: String, enum: ['muž', 'žena'], required: true },
    obec: { type: String, required: true },
    stat: { type: String, required: true, default: 'Česká republika' },
    klub: { type: String },
    email: { type: String },
    telefon: { type: String },
  },
  { _id: false, bufferCommands: false }
);

module.exports = UdajeSchema;
