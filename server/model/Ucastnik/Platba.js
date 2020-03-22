'use strict';

const mongoose = require('mongoose');
const common = require('../../../common/common');

const PlatbaSchema = new mongoose.Schema(
  {
    castka: { type: Number, required: true },
    datum: { type: Date, required: true },
    typ: { type: String, enum: common.PLATBA_TYPY, required: true },
    poznamka: { type: String },
  },
  { _id: false, bufferCommands: false }
);

module.exports = PlatbaSchema;
