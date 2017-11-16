'use strict';

const mongoose = require('mongoose');
const UdajeSchema = require('./Udaje');
const PrihlaskaSchema = require('./Prihlaska');
const VykonSchema = require('./Vykon');
const PlatbaSchema = require('./Platba');
const UbytovaniSchema = require('./Ubytovani');

const UcastSchema = new mongoose.Schema(
  {
    rok: { type: Number, required: true, index: true },
    udaje: { type: UdajeSchema, required: true },
    prihlaska: { type: PrihlaskaSchema },
    vykon: { type: VykonSchema },
    platby: { type: [PlatbaSchema], default: null },
    ubytovani: { type: UbytovaniSchema },
    poznamka: { type: String }
  },
  { _id: false, bufferCommands: false }
);

module.exports = UcastSchema;
