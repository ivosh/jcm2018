import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from '../../shared/LoadingIndicator';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import StartujiciProTypContainer from '../../shared/StartujiciProTyp/StartujiciProTypContainer';
import './Startujici.css';

class Startujici extends PureComponent {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  render = () => {
    const { fetching, typy } = this.props;

    if (fetching) {
      return (
        <div className="Startujici_div">
          <LoadingIndicator /> Načítám účastníky...
        </div>
      );
    }

    return (
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
  };
}

Startujici.propTypes = {
  fetching: PropTypes.bool.isRequired,
  typy: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchUcastnici: PropTypes.func.isRequired
};

export default Startujici;
