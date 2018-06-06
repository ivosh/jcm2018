import React from 'react';
import PropTypes from 'prop-types';
import { narozeniToStr } from '../../Util';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import PoradiFilters from './PoradiFilters';
import './Poradi.css';

const kategorieFormat = ({ cellData }) => <PopisekKategorie {...cellData} />;
kategorieFormat.propTypes = {
  cellData: PropTypes.object.isRequired
};

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

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
      width: 200
    },
    {
      cellClassNames: () => ['align-right'],
      key: 'startCislo',
      label: 'číslo',
      sortable: true,
      width: 60
    },
    {
      key: 'dokonceno',
      label: 'dokončeno',
      sortable: false,
      width: 60
    },
    {
      key: 'cas',
      label: 'čas',
      sortable: false,
      width: 100
    },
    {
      key: 'absPoradi',
      label: 'abs.',
      sortable: false,
      width: 60
    },
    {
      key: 'relPoradi',
      label: 'rel.',
      sortable: false,
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
        typ: PropTypes.string.isRequired
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
