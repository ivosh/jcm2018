import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Ucastnici.css';

class Ucastnici extends Component {
  componentDidMount = () => {
    const { fetchUcastnici } = this.props;
    fetchUcastnici();
  };

  render = () => {
    const ucastnici = this.props.ucastnici;

    if (ucastnici.length === 0) {
      return <div className="Ucastnici">žádný účastník</div>;
    }

    return (
      <ul className="Ucastnici">
        {ucastnici.map(ucastnik => (
          <li key={ucastnik.id}>
            {ucastnik.prijmeni} {ucastnik.jmeno} {ucastnik.narozeni}
          </li>
        ))}
      </ul>
    );
  };
}

Ucastnici.propTypes = {
  ucastnici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  fetchUcastnici: PropTypes.func.isRequired
};

export default Ucastnici;
