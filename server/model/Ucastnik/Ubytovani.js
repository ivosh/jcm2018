'use strict';

const mongoose = require('mongoose');

const UbytovaniSchema = new mongoose.Schema(
  {
    prihlaseno: { type: Boolean },
    prespano: { type: Boolean },
  },
  { _id: false, bufferCommands: false }
);

module.exports = UbytovaniSchema;
