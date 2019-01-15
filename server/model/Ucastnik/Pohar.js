'use strict';

const mongoose = require('mongoose');

const PoharSchema = new mongoose.Schema(
  {
    predano: { type: Number, default: 0 }
  },
  { _id: false, bufferCommands: false }
);

module.exports = PoharSchema;
