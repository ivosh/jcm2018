'use strict';

const mongoose = require('mongoose');

const VykonSchema = new mongoose.Schema(
  {
    kategorie: { type: mongoose.Schema.ObjectId, ref: 'Kategorie', required: true },
    startCislo: { type: Number },
    dokonceno: { type: Boolean },
    cas: { type: String }
  },
  { _id: false, bufferCommands: false }
);

module.exports = VykonSchema;
