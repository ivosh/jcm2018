import React from 'react';
import PropTypes from 'prop-types';
import { AKTUALNI_ROK } from '../../constants';
import EmailComposerContainer from '../EmailComposer/EmailComposerContainer';

const prechylenaOdbavena = pohlavi => (pohlavi === 'žena' ? 'odbavena' : 'odbaven');

// :TODO: předepsané startovné už nabíhá na místě - predepsanoPredem?
const EmailStartovne = ({ prijmeni, jmeno, pohlavi, email, kod, predepsano }) => (
  <EmailComposerContainer
    mailTo={email}
    subject={`Jirkovský crossmarathon ${AKTUALNI_ROK} - startovné`}
    body={`Ahoj,<br/>
děkujeme za včasnou přihlášku na Jirkovský crossmarathon ${AKTUALNI_ROK}.<br/>
Startovné je třeba uhradit do 31. května 2020.
Využij výhod zlevněného startovného a na startu budeš ${prechylenaOdbavena(pohlavi)}
bez čekání ve frontě na dohlášky.
<br/>
<br/>
Částku ve výši ${predepsano >= 350 ? predepsano - 100 : predepsano} Kč
uhraď na účet <b>1182341045/3030</b>.<br/>
Jako variabilní symbol uveď následující kód: <b>${kod}</b>.<br/>
Do zprávy pro příjemce pak uveď jméno a příjmení (${jmeno} ${prijmeni}).<br/><br/>
Na viděnou v sobotu 6. června 2020,<br/>
Ivo Raisr`}
  />
);

EmailStartovne.propTypes = {
  prijmeni: PropTypes.string.isRequired,
  jmeno: PropTypes.string.isRequired,
  pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired,
  email: PropTypes.string.isRequired,
  kod: PropTypes.string,
  predepsano: PropTypes.number.isRequired
};

EmailStartovne.defaultProps = {
  kod: ''
};

export default EmailStartovne;
