'use strict';

const mongoose = require('mongoose');

const UbytovaniSchema = new mongoose.Schema(
  {
    den: { type: String, enum: ['pátek', 'sobota'], required: true },
    prihlaseno: { type: Boolean },
    absolvovano: { type: Boolean }
  },
  { _id: false, bufferCommands: false }
);

module.exports = UbytovaniSchema;