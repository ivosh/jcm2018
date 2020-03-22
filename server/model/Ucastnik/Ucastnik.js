'use strict';

const mongoose = require('mongoose');
const PoharSchema = require('./Pohar');
const ProfilSchema = require('./Profil');
const UcastSchema = require('./Ucast');

const UcastnikSchema = new mongoose.Schema(
  {
    ucasti: [UcastSchema],
    pohar: { type: PoharSchema },
    profil: { type: ProfilSchema },
  },
  { bufferCommands: false, usePushEach: true }
);

UcastnikSchema.methods.getLatestEmail = function getLatestEmail() {
  if (!this.ucasti || (this.profil && this.profil.vyraditZDistribuce)) {
    return { id: this._id, email: undefined, rok: undefined };
  }

  let email;
  let rok;
  this.ucasti.forEach((ucast) => {
    if (ucast.udaje.email && (!rok || ucast.rok > rok)) {
      ({ rok } = ucast);
      ({ email } = ucast.udaje);
    }
  });

  return { id: this._id, email, rok };
};

UcastnikSchema.static('getEmailsForDistribution', async function getEmailsForDistribution(
  aktualniRok
) {
  const ucastnici = await this.find({});
  const emails = ucastnici
    .map((ucastnik) => ucastnik.getLatestEmail())
    .filter(({ email, rok }) => email && rok !== aktualniRok);
  return emails;
});

module.exports = mongoose.model('Ucastnik', UcastnikSchema);
