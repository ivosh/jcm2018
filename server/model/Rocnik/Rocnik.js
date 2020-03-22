'use strict';

const mongoose = require('mongoose');
const TypKategorieSchema = require('./TypKategorie');
const UbytovaniSchema = require('./Ubytovani');

const RocnikSchema = new mongoose.Schema(
  {
    rok: { type: Number, required: true },
    datum: { type: Date, required: true },
    uzaverka: {
      prihlasek: { type: Date },
      platebPrihlasek: { type: Date },
    },
    kategorie: { type: [TypKategorieSchema], required: true },
    ubytovani: {
      pátek: { type: UbytovaniSchema },
      sobota: { type: UbytovaniSchema },
    },
  },
  { bufferCommands: false, usePushEach: true }
);

module.exports = mongoose.model('Rocnik', RocnikSchema);
