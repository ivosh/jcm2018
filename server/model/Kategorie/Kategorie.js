'use strict';

const mongoose = require('mongoose');
const VekSchema = require('./Vek');

const KategorieSchema = new mongoose.Schema(
  {
    typ: {
      type: String,
      enum: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka', 'pěší'],
      required: true,
    },
    pohlavi: { type: String, enum: ['muž', 'žena'] },
    vek: { type: VekSchema },
  },
  { bufferCommands: false, usePushEach: true }
);

module.exports = mongoose.model('Kategorie', KategorieSchema);
