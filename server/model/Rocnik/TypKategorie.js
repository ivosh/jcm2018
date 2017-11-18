'use strict';

const mongoose = require('mongoose');

const TypKategorieSchema = new mongoose.Schema(
  {
    typ: {
      type: String,
      enum: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka', 'pěší'],
      required: true
    },
    kategorie: [{ type: mongoose.Schema.ObjectId, ref: 'Kategorie', unique: true }],
    startCisla: { type: String },
    startovnePredem: { type: Number, required: true },
    startvneNaMiste: { type: Number, required: true }
  },
  { _id: false, bufferCommands: false }
);

module.exports = TypKategorieSchema;
