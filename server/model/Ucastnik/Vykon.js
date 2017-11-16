'use strict';

const mongoose = require('mongoose');

const VykonSchema = new mongoose.Schema(
  {
    kategorie: { type: String, required: true }, // bude {type: Schema.ObjectId, ref: 'Kategorie'}
    dokonceno: { type: Boolean },
    cas: { type: String }
  },
  { _id: false, bufferCommands: false }
);

module.exports = VykonSchema;
