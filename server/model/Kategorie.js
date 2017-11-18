'use strict';

const mongoose = require('mongoose');

const KategorieSchema = new mongoose.Schema(
  {
    typ: {
      type: String,
      enum: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka', 'pěší'],
      required: true
    },
    pohlavi: { type: String, enum: ['muz', 'zena'] },
    minVek: { type: Number },
    maxVek: { type: Number },
    presnyVek: { type: Boolean }
  },
  { bufferCommands: false, usePushEach: true }
);

module.exports = mongoose.model('Kategorie', KategorieSchema);
