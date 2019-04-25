import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import convertDuration from 'ui-common/convertDuration';
import { findDokonceno, narozeniToStr } from '../../Util';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import PoradiFilters from './PoradiFilters';
import './Poradi.css';

const casFormat = ({ cellData }) => {
  if (cellData) {
    const { hours, mins, secs, subsecs } = convertDuration(moment.duration(cellData));
    return `${hours}:${mins}:${secs},${subsecs}`;
  }
  return '';
};

const dokoncenoFormat = ({ cellData }) => findDokonceno(cellData).popisek;

const kategorieFormat = ({ cellData }) => <PopisekKategorie {...cellData} />; // uses 'zkratka'
kategorieFormat.propTypes = {
  cellData: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
};

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

const poradiFormat = ({ cellData, data, rowIndex }) => {
  if (cellData) {
    return `${cellData}.`;
  }
  const { dokonceno } = data[rowIndex];
  if (dokonceno === false) {
    return '-';
  }
  return '';
};

const Poradi = ({
  actionPrefix,
  kategorieFilters,
  kategorieSubFilters,
  kategorieSubFiltersVisible,
  poradi,
  reduxName,
  textFilter,
  onTextFilterChange
}) => {
  const columns = [
    {
      cellClassNames: () => ['align-left'],
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
    {
      cellClassNames: ({ cellData }) => ['align-left', `Poradi--${cellData.typ}`],
      cellDataFormatter: kategorieFormat,
      key: 'kategorie',
      sortable: true,
      width: 220
    },
    {
      cellClassNames: () => ['align-right'],
      key: 'startCislo',
      label: 'číslo',
      sortable: true,
      width: 60
    },
    {
      cellDataFormatter: dokoncenoFormat,
      cellClassNames: ({ cellData }) => ['align-left', `Poradi--${findDokonceno(cellData).name}`],
      key: 'dokonceno',
      label: 'dokončeno',
      sortable: true,
      width: 110
    },
    {
      cellDataFormatter: casFormat,
      key: 'cas',
      label: 'čas',
      sortable: true,
      width: 100
    },
    {
      cellDataFormatter: poradiFormat,
      key: 'absPoradi',
      label: 'abs.',
      sortable: true,
      width: 60
    },
    {
      cellDataFormatter: poradiFormat,
      key: 'relPoradi',
      label: 'rel.',
      sortable: true,
      width: 60
    }
  ];

  return (
    <div className="Poradi__div UcastniciTable_container">
      <PoradiFilters
        kategorieFilters={kategorieFilters}
        kategorieSubFilters={kategorieSubFilters}
        kategorieSubFiltersVisible={kategorieSubFiltersVisible}
        numberOfItems={poradi.length}
        textFilter={textFilter}
        onTextFilterChange={onTextFilterChange}
      />

      <UcastniciTableContainer
        actionPrefix={actionPrefix}
        columns={columns}
        data={poradi}
        fixedColumnCount={3}
        reduxName={reduxName}
        rowHeight={35}
      />
    </div>
  );
};

Poradi.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  kategorieFilters: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      typ: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  kategorieSubFilters: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      id: PropTypes.string.isRequired,
      typ: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired
    }).isRequired
  ).isRequired,
  kategorieSubFiltersVisible: PropTypes.bool.isRequired,
  poradi: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        den: PropTypes.number,
        mesic: PropTypes.number,
        rok: PropTypes.number.isRequired
      }).isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired,
        zkratka: PropTypes.string.isRequired
      }).isRequired,
      startCislo: PropTypes.number,
      dokonceno: PropTypes.bool,
      cas: PropTypes.string,
      absPoradi: PropTypes.number,
      relPoradi: PropTypes.number
    }).isRequired
  ).isRequired,
  reduxName: PropTypes.string.isRequired,
  textFilter: PropTypes.string.isRequired,
  onTextFilterChange: PropTypes.func.isRequired
};

export default Poradi;
