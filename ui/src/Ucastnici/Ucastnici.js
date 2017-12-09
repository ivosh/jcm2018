import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import 'react-table/react-table.css';
import { csStringSortMethod, narozeniSortMethod } from './ucastniciReducer';
import './Ucastnici.css';

const NarozeniRenderer = row => {
  if (row.value.mesic && row.value.den) {
    return (
      <div>
        {row.value.den}. {row.value.mesic}. {row.value.rok}
      </div>
    );
  }
  return <div>{row.value.rok}</div>;
};

class Ucastnici extends Component {
  componentDidMount = () => {
    const { fetchUcastnici } = this.props;
    fetchUcastnici();
  };

  render = () => {
    const { ucastnici } = this.props;

    if (ucastnici.length === 0) {
      return <div className="Ucastnici">žádný účastník</div>;
    }

    const columns = [
      {
        Header: 'Příjmení',
        accessor: 'prijmeni',
        sortMethod: csStringSortMethod
      },
      {
        Header: 'Jméno',
        accessor: 'jmeno',
        sortMethod: csStringSortMethod
      },
      {
        Header: 'Narození',
        accessor: 'narozeni',
        sortMethod: narozeniSortMethod,
        Cell: NarozeniRenderer
      }
    ];

    return (
      <ReactTable
        className="-striped -highlight"
        data={ucastnici}
        columns={columns}
        showPagination={false}
        defaultPageSize={ucastnici.length}
      />
    );
  };
}

Ucastnici.propTypes = {
  ucastnici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        rok: PropTypes.number.isRequired,
        mesic: PropTypes.number,
        den: PropTypes.number
      })
    }).isRequired
  ).isRequired,
  fetchUcastnici: PropTypes.func.isRequired
};

export default Ucastnici;
