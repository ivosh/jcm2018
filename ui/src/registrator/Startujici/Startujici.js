import React from 'react';
import PropTypes from 'prop-types';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import StartujiciProTypContainer from '../../shared/StartujiciProTyp/StartujiciProTypContainer';
import './Startujici.css';

const Startujici = ({ typy }) => (
  <div className="Startujici_div">
    {typy.map(typ => (
      <div key={typ} className="Startujici_typ">
        <div className="Startujici_popisek">
          <PopisekKategorie typ={typ} />
        </div>
        <StartujiciProTypContainer
          jenStartujici={false}
          prihlasky={true}
          typ={typ}
          onClick={() => true}
        />
      </div>
    ))}
  </div>
);

Startujici.propTypes = {
  typy: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Startujici;
