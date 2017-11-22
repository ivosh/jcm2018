'use strict';

const mongoose = require('mongoose');
const uniqueArrayPlugin = require('mongoose-unique-array');
const Startovne = require('./Startovne');

const TypKategorieSchema = new mongoose.Schema(
  {
    typ: {
      type: String,
      enum: ['maraton', 'půlmaraton', 'cyklo', 'koloběžka', 'pěší'],
      required: true
    },
    kategorie: [{ type: mongoose.Schema.ObjectId, ref: 'Kategorie' }],
    startCisla: { type: String },
    startovne: { type: Startovne, required: true }
  },
  { _id: false, bufferCommands: false }
);

// Prevent duplicates in kategorie array.
TypKategorieSchema.plugin(uniqueArrayPlugin);

module.exports = TypKategorieSchema;
