'use strict';

const mongoose = require('mongoose');
const TypKategorie = require('./TypKategorie');
const Ubytovani = require('./Ubytovani');

const RocnikSchema = new mongoose.Schema(
  {
    rok: { type: Number, required: true },
    datum: { type: Date, required: true },
    kategorie: { type: [TypKategorie], required: true },
    ubytovani: { type: [Ubytovani], default: null }
  },
  { bufferCommands: false, usePushEach: true }
);

module.exports = mongoose.model('Rocnik', RocnikSchema);
