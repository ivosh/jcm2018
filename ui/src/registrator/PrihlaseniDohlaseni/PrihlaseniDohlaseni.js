import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import { narozeniToStr } from '../../Util';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import FilterableContainer from '../Filterable/FilterableContainer';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import PoznamkyModal from '../Poznamky/PoznamkyModal';
import PrihlaseniDohlaseniFilter from './PrihlaseniDohlaseniFilter';
import './PrihlaseniDohlaseni.css';

const datumFormat = ({ cellData }) => moment.utc(cellData).format('D. M. YYYY');

const kategorieFormat = ({ cellData }) => <PopisekKategorie {...cellData} />;
kategorieFormat.propTypes = {
  cellData: PropTypes.object.isRequired
};

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

// :TODO: indikace jsouPoznamky? --existing
const PoznamkyFormat = ({ cellData: { id, showing, onHide, onShow } }) => (
  <React.Fragment>
    {!showing && (
      <Button bsSize="small" onClick={onShow}>
        <Glyphicon glyph="edit" />
      </Button>
    )}
    {showing && <PoznamkyModal id={id} show={showing} onClose={onHide} />}
  </React.Fragment>
);
PoznamkyFormat.propTypes = {
  cellData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    showing: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  })
};

const prijmeniFormat = ({ cellData, data, route, rowIndex }) => (
  <Link to={`/${route}/${data[rowIndex].id}`}>{cellData}</Link>
);
prijmeniFormat.propTypes = {
  cellData: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })),
  route: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired
};

const zaplacenoFormat = ({ cellData }) => `${cellData} Kč`;

const PrihlaseniDohlaseni = ({
  actionPrefix,
  reduxName,
  route,
  dohlaseniFilter,
  prihlaseniFilter,
  prihlaseniDohlaseni
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
      cellClassNames: ({ cellData }) => ['align-left', `PrihlaseniDohlaseni--${cellData.typ}`],
      cellDataFormatter: kategorieFormat,
      key: 'kategorie',
      sortable: true,
      width: 180
    },
    {
      cellClassNames: () => ['align-right'],
      key: 'startCislo',
      label: 'číslo',
      sortable: true,
      width: 70
    },
    { cellClassNames: () => ['align-left', 'monospace'], key: 'kod', label: 'kód', width: 90 },
    {
      cellClassNames: ({ cellData, data, rowIndex }) => {
        if (cellData >= data[rowIndex].predepsano) {
          return ['PrihlaseniDohlaseni--zaplaceno'];
        }
        if (cellData > 0) {
          return ['PrihlaseniDohlaseni--castecne-zaplaceno'];
        }
        return ['PrihlaseniDohlaseni--nezaplaceno'];
      },
      cellDataFormatter: zaplacenoFormat,
      key: 'zaplaceno',
      sortable: true,
      width: 110
    },
    {
      cellClassNames: () => ['PrihlaseniDohlaseni__poznamky'],
      cellDataFormatter: PoznamkyFormat,
      key: 'poznamky',
      label: 'poznámky',
      width: 100
    }
  ];

  return (
    <div className="PrihlaseniDohlaseni__div UcastniciTable_container">
      <div className="PrihlaseniDohlaseni__filters">
        <PrihlaseniDohlaseniFilter bsStyle="primary" {...prihlaseniFilter} />
        <PrihlaseniDohlaseniFilter bsStyle="success" {...dohlaseniFilter} />
        <FilterableContainer
          actionPrefix={actionPrefix}
          reduxName={reduxName}
          numberOfItems={prihlaseniDohlaseni.length}
        />
      </div>

      <UcastniciTableContainer
        actionPrefix={actionPrefix}
        columns={columns}
        data={prihlaseniDohlaseni}
        fixedColumnCount={3}
        reduxName={reduxName}
        route={route}
        rowHeight={35}
      />
    </div>
  );
};

PrihlaseniDohlaseni.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  dohlaseniFilter: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
  prihlaseniFilter: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  }),
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
      zaplaceno: PropTypes.number.isRequired,
      poznamky: PropTypes.shape({
        id: PropTypes.string.isRequired,
        showing: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired,
        onShow: PropTypes.func.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default PrihlaseniDohlaseni;
