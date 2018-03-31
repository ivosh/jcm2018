import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, FormControl, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import { narozeniToStr } from '../../Util';
import LoadingIndicator from '../../shared/LoadingIndicator';
import TextFilter from '../Filterable/TextFilter';
import Zobrazeno from '../Filterable/Zobrazeno';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import './Ubytovani.css';

const akceFormat = ({ cellData: { loading, options, onSelect } }) =>
  loading ? (
    <LoadingIndicator />
  ) : (
    <FormControl componentClass="select" name="akce" onChange={onSelect}>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </FormControl>
  );
akceFormat.propTypes = {
  cellData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired
  })
};

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

const prespanoClasses = ({ cellData }) => {
  if (cellData === true) {
    return ['Ubytovani--prespano'];
  } else if (cellData === false) {
    return ['Ubytovani--neprespano'];
  }
  return ['Ubytovani--nevime'];
};

const prijmeniFormat = args => (
  <Link to={`/prihlasky/${args.data[args.rowIndex].id}`}>{args.cellData}</Link>
);

const Ubytovani = ({
  actionPrefix,
  jenUbytovani,
  reduxName,
  textFilter,
  ubytovani,
  onTextFilterChange,
  onUbytovaniChange
}) => {
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
      cellClassNames: ({ cellData }) => (cellData === true ? ['Ubytovani--prihlaseno'] : []),
      key: 'prihlaseno',
      label: 'přihlášeno',
      width: 100
    },
    {
      cellDataFormatter: prespanoFormat,
      cellClassNames: prespanoClasses,
      key: 'prespano',
      label: 'přespáno',
      width: 90
    },
    { cellDataFormatter: akceFormat, key: 'akce', label: 'akce', width: 120 }
  ];

  return (
    <div className="Ubytovani__div UcastniciTable_container">
      <div>
        <TextFilter filter={textFilter} onChange={onTextFilterChange} />

        <span className="Ubytovani__buttons">
          <Button
            active={jenUbytovani}
            bsStyle="success"
            className="Ubytovani__button"
            onClick={onUbytovaniChange}
          >
            <Glyphicon glyph="bed" /> Jen ubytovaní
          </Button>
          <Button
            active={!jenUbytovani}
            bsStyle="primary"
            className="Ubytovani__button"
            onClick={onUbytovaniChange}
          >
            <Glyphicon glyph="list-alt" /> Všichni přihlášeni
          </Button>
        </span>

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
  jenUbytovani: PropTypes.bool.isRequired,
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
      datum: PropTypes.instanceOf(Date).isRequired,
      prihlaseno: PropTypes.bool,
      prespano: PropTypes.bool,
      akce: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        options: PropTypes.arrayOf(PropTypes.string.isRequired),
        onSelect: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  onTextFilterChange: PropTypes.func.isRequired,
  onUbytovaniChange: PropTypes.func.isRequired
};

export default Ubytovani;
