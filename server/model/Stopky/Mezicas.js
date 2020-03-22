'use strict';

const mongoose = require('mongoose');

const MezicasSchema = new mongoose.Schema(
  {
    cas: { type: String, require: true },
    korekce: { type: String },
  },
  { _id: false, bufferCommands: false }
);

module.exports = MezicasSchema;
