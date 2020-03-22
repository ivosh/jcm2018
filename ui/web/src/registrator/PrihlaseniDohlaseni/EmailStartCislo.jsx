import React from 'react';
import PropTypes from 'prop-types';
import { AKTUALNI_ROK } from '../../constants';
import EmailComposerContainer from '../EmailComposer/EmailComposerContainer';

const prechylenaPrihlasena = (pohlavi) => (pohlavi === 'žena' ? 'přihlášena' : 'přihlášen');

const EmailStartCislo = ({ pohlavi, email, kategorie, startCislo }) => (
  <EmailComposerContainer
    mailTo={email}
    subject={`Jirkovský crossmarathon ${AKTUALNI_ROK} - ${prechylenaPrihlasena(pohlavi)}`}
    body={`Ahoj,<br/>
děkujeme za platbu startovného na Jirkovský crossmarathon ${AKTUALNI_ROK}.<br/>
Jsi v pořádku ${prechylenaPrihlasena(pohlavi)} na kategorii <b>${kategorie.typ}</b>${
      startCislo ? ` se startovním číslem ${startCislo}` : ''
    }.
<br/>
<br/>
Na viděnou v sobotu 6. června 2020,<br/>
Ivo Raisr`}
  />
);

EmailStartCislo.propTypes = {
  pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired,
  email: PropTypes.string.isRequired,
  kategorie: PropTypes.shape({
    typ: PropTypes.string.isRequired,
  }).isRequired,
  startCislo: PropTypes.number,
};

EmailStartCislo.defaultProps = {
  startCislo: undefined,
};

export default EmailStartCislo;
