'use strict';

const mongoose = require('mongoose');

const PrihlaskaSchema = new mongoose.Schema(
  {
    datum: { type: Date, required: true },
    kategorie: { type: mongoose.Schema.ObjectId, ref: 'Kategorie', required: true },
    startCislo: { type: Number },
    kod: { type: String },
    mladistvyPotvrzen: { type: Boolean },
    startovnePoSleve: { type: Number }
  },
  { _id: false, bufferCommands: false }
);

module.exports = PrihlaskaSchema;
