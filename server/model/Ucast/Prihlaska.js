'use strict';

const mongoose = require('mongoose');

const PrihlaskaSchema = new mongoose.Schema(
  {
    datum: { type: Date, required: true },
    kategorie: { type: String, required: true } // bude {type: Schema.ObjectId, ref: 'Kategorie'}
  },
  { _id: false }
);

module.exports = PrihlaskaSchema;
