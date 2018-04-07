import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import './StartujiciPanel.css';

const StartujiciPanel = ({ bsStyle, popisek, seznam }) => (
  <Panel bsStyle={bsStyle} header={popisek}>
    <div className="StartujiciPanel__grid">
      <div className="StartujiciPanel__header">příjmení</div>
      <div className="StartujiciPanel__leftHeader">jméno</div>
      <div className="StartujiciPanel__middleHeader">narození</div>
      <div className="StartujiciPanel__middleHeader">kategorie</div>
      <div className="StartujiciPanel__header">číslo</div>
      {seznam.map(({ id, prijmeni, jmeno, narozeni, kategorie, startCislo }) => (
        <React.Fragment key={id}>
          <div className="StartujiciPanel__prijmeni">{prijmeni}</div>
          <div className="StartujiciPanel__jmeno">{jmeno}</div>
          <div className="StartujiciPanel__narozeni">{narozeni.rok}</div>
          <div
            className={`StartujiciPanel__kategorie StartujiciPanel__kategorie--${kategorie.typ}`}
          >
            <PopisekKategorie {...kategorie} />
          </div>
          <div className="StartujiciPanel__startCislo">{startCislo}</div>
        </React.Fragment>
      ))}
    </div>
  </Panel>
);

StartujiciPanel.propTypes = {
  bsStyle: PropTypes.string.isRequired,
  popisek: PropTypes.any.isRequired,
  seznam: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        rok: PropTypes.number.isRequired
      }).isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired
      }).isRequired,
      startCislo: PropTypes.number
    })
  ).isRequired
};

export default StartujiciPanel;
