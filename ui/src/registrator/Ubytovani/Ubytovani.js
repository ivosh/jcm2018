import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { narozeniToStr } from '../../Util';
import TextFilter from '../Filterable/TextFilter';
import Zobrazeno from '../Filterable/Zobrazeno';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import './Ubytovani.css';

const datumFormat = ({ cellData }) => moment.utc(cellData).format('D. M. YYYY');

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

const prihlasenoFormat = ({ cellData }) => (cellData ? '✓' : '✗');
const prespanoFormat = ({ cellData }) => {
  if (cellData === true) {
    return '✓';
  } else if (cellData === false) {
    return '✗';
  }
  return '?';
};

const prijmeniFormat = args => (
  <Link to={`/prihlasky/${args.data[args.rowIndex].id}`}>{args.cellData}</Link>
);

const Ubytovani = ({ actionPrefix, reduxName, textFilter, ubytovani, onTextFilterChange }) => {
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
      cellDataFormatter: prihlasenoFormat,
      key: 'prihlaseno',
      label: 'přihlášeno',
      sortable: true,
      width: 90
    },
    {
      cellDataFormatter: prespanoFormat,
      key: 'prespano',
      label: 'přespáno',
      sortable: true,
      width: 90
    }
  ];

  return (
    <div className="Ubytovani__div UcastniciTable_container">
      <div>
        <TextFilter filter={textFilter} onChange={onTextFilterChange} />
        <Zobrazeno numberOfItems={ubytovani.length} />
      </div>

      <UcastniciTableContainer
        actionPrefix={actionPrefix}
        columns={columns}
        data={ubytovani}
        fixedColumnCount={3}
        reduxName={reduxName}
        rowHeight={35}
      />
    </div>
  );
};

Ubytovani.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  textFilter: PropTypes.string.isRequired,
  ubytovani: PropTypes.arrayOf(
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
      datum: PropTypes.instanceOf(Date).isRequired
    }).isRequired
  ).isRequired,
  onTextFilterChange: PropTypes.func.isRequired
};

export default Ubytovani;
