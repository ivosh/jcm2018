import React from 'react';
import PropTypes from 'prop-types';
import EmailComposerContainer from '../EmailComposer/EmailComposerContainer';

// :TODO: předepsané startovné už nabíhá na místě - predepsanoPredem?
const EmailStartovne = ({ prijmeni, jmeno, email, kod, predepsano }) => (
  <EmailComposerContainer
    mailTo={email}
    subject="Jirkovský crossmarathon - zaplacení startovného"
    body={`Dobrý den,<br/>
děkujeme za včasnou přihlášku na Jirkovský crossmarathon 2019.<br/>
Prosím uhraďte startovné do 6. června 2019.
Využijete výhod zlevněného startovného a na startu budete odbaveni bez čekání ve frontě na dohlášky.
<br/>
<br/>
Částku ve výši ${predepsano >= 200 ? predepsano - 50 : predepsano} Kč
uhraďte na účet <b>1182341045/3030</b>.<br/>
Jako variabilní symbol uveďte následující kód: <b>${kod}</b>.<br/>
Do zprávy pro příjemce pak uveďte jméno a příjmení (${jmeno} ${prijmeni}).<br/><br/>
Na viděnou v sobotu,<br/>
Ivo Raisr`}
  />
);

EmailStartovne.propTypes = {
  prijmeni: PropTypes.string.isRequired,
  jmeno: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  kod: PropTypes.string,
  predepsano: PropTypes.number.isRequired
};

EmailStartovne.defaultProps = {
  kod: ''
};

export default EmailStartovne;
