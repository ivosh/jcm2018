'use strict';

const mongoose = require('mongoose');

const NarozeniSchema = new mongoose.Schema(
  {
    den: { type: Number },
    mesic: { type: Number },
    rok: { type: Number, required: true }
  },
  { _id: false }
);

module.exports = NarozeniSchema;
