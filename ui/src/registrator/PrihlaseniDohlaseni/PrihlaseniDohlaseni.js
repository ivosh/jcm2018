import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { narozeniToStr } from '../../Util';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import FilterableContainer from '../Filterable/FilterableContainer';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import './PrihlaseniDohlaseni.css';

const datumFormat = ({ cellData }) => moment.utc(cellData).format('D. M. YYYY');

const kategorieFormat = args => <PopisekKategorie {...args.cellData} />;

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

const prijmeniFormat = args => (
  <Link to={`/prihlasky/${args.data[args.rowIndex].id}`}>{args.cellData}</Link>
);

const zaplacenoFormat = ({ cellData }) => `${cellData} Kč`;

const PrihlaseniDohlaseni = ({ actionPrefix, reduxName, prihlaseniDohlaseni }) => {
  const columns = [
    {
      cellClassNames: () => ['align-left'],
      cellDataFormatter: prijmeniFormat,
      key: 'prijmeni',
      label: 'příjmení',
      sortable: true,
      width: 100
    },
    {
      cellClassNames: () => ['align-left'],
      key: 'jmeno',
      label: 'jméno',
      sortable: true,
      width: 90
    },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: narozeniFormat,
      key: 'narozeni',
      label: 'narození',
      sortable: true,
      width: 100
    },
    { cellClassNames: () => ['align-left'], key: 'obec', sortable: true, width: 90 },
    { cellClassNames: () => ['align-left'], key: 'email', sortable: true, width: 200 },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: datumFormat,
      key: 'datum',
      label: 'přihlášení',
      sortable: true,
      width: 110
    },
    {
      cellClassNames: ({ cellData }) => ['align-left', `PrihlaseniDohlaseni--${cellData.typ}`],
      cellDataFormatter: kategorieFormat,
      key: 'kategorie',
      sortable: true,
      width: 200
    },
    {
      cellClassNames: () => ['align-right'],
      key: 'startCislo',
      label: 'číslo',
      sortable: true,
      width: 60
    },
    { cellClassNames: () => ['align-left', 'monospace'], key: 'kod', label: 'kód', width: 150 },
    {
      cellClassNames: ({ cellData, data, rowIndex }) => {
        if (cellData >= data[rowIndex].predepsano) {
          return ['PrihlaseniDohlaseni--zaplaceno'];
        } else if (cellData > 0) {
          return ['PrihlaseniDohlaseni--castecne-zaplaceno'];
        }
        return ['PrihlaseniDohlaseni--nezaplaceno'];
      },
      cellDataFormatter: zaplacenoFormat,
      key: 'zaplaceno',
      sortable: true,
      width: 100
    }
  ];

  return (
    <div className="PrihlaseniDohlaseni_div UcastniciTable_container">
      <FilterableContainer
        actionPrefix={actionPrefix}
        reduxName={reduxName}
        numberOfItems={prihlaseniDohlaseni.length}
      />

      <UcastniciTableContainer
        actionPrefix={actionPrefix}
        columns={columns}
        data={prihlaseniDohlaseni}
        fixedColumnCount={3}
        reduxName={reduxName}
        rowHeight={35}
      />
    </div>
  );
};

PrihlaseniDohlaseni.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  prihlaseniDohlaseni: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        den: PropTypes.number,
        mesic: PropTypes.number,
        rok: PropTypes.number.isRequired
      }).isRequired,
      obec: PropTypes.string.isRequired,
      email: PropTypes.string,
      datum: PropTypes.instanceOf(Date).isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired
      }).isRequired,
      startCislo: PropTypes.number,
      kod: PropTypes.string,
      predepsano: PropTypes.number.isRequired,
      zaplaceno: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default PrihlaseniDohlaseni;
