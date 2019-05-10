'use strict';

const mongoose = require('mongoose');

const ProfilSchema = new mongoose.Schema(
  {
    vyraditZDistribuce: { type: Boolean, default: false }
  },
  { _id: false, bufferCommands: false }
);

module.exports = ProfilSchema;
