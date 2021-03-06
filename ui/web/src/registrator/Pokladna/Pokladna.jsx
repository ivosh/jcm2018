import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import PokladnaCastek from './PokladnaCastek';
import PokladnaTypu from './PokladnaTypu';
import './Pokladna.css';

const Pokladna = ({ pokladna: { total, typy } }) => (
  <div className="Pokladna">
    <Panel bsStyle="success" header="Celkově" className="Pokladna__panel">
      <div className="Pokladna__typy">
        <PokladnaTypu name="celkově" {...total} />
      </div>
    </Panel>
    <Panel bsStyle="info" header="po kategoriích" className="Pokladna__panel">
      <div className="Pokladna__typy">
        {Object.keys(typy).map((name) => (
          <PokladnaTypu key={name} name={name} {...typy[name]} />
        ))}
      </div>
    </Panel>
    <Panel bsStyle="info" header="po částkách" className="Pokladna__panel">
      <div className="Pokladna__typy">
        {Object.keys(total.typy).map((name) => (
          <PokladnaCastek key={name} name={name} {...total.typy[name]} />
        ))}
        {total.zaloha && <PokladnaCastek name="z toho záloha" {...total.zaloha} />}
      </div>
    </Panel>
  </div>
);

Pokladna.propTypes = {
  pokladna: PropTypes.shape({
    total: PropTypes.shape({
      odstartovano: PropTypes.number.isRequired,
      suma: PropTypes.number.isRequired,
      ucastniku: PropTypes.number.isRequired,
      zaloha: PropTypes.shape({
        counts: PropTypes.object.isRequired,
        suma: PropTypes.number.isRequired,
      }),
      typy: PropTypes.object,
    }).isRequired,
    typy: PropTypes.object,
  }).isRequired,
};

export default Pokladna;
