'use strict';

const mongoose = require('mongoose');
const Startovne = require('./Startovne');

const TypKategorieSchema = new mongoose.Schema(
  {
    typ: {
      type: String,
      enum: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka', 'pěší'],
      required: true
    },
    kategorie: [{ type: mongoose.Schema.ObjectId, ref: 'Kategorie', unique: true }],
    startCisla: { type: String },
    startovne: { type: Startovne, required: true }
  },
  { _id: false, bufferCommands: false }
);

module.exports = TypKategorieSchema;
