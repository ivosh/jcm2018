import React from 'react';
import PropTypes from 'prop-types';
import { barvaProTypKategorie } from '../../Util';
import FilterableContainer from '../Filterable/FilterableContainer';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import './UcastniciDigest.css';

const alignLeftStyler = () => ({ textAlign: 'left' });
const alignRightStyler = () => ({ textAlign: 'right' });

const vykonCellDataFormatter = ({ cellData }) => {
  if (cellData) {
    if (cellData.dokonceno === true) {
      return '✓';
    } else if (cellData.dokonceno === false) {
      return '✗';
    }
    return '?';
  }
  return '';
};

const vykonCellStyler = ({ cellData }) => {
  if (cellData) {
    return {
      backgroundColor: barvaProTypKategorie(cellData.kategorie)
    };
  }
  return {};
};

const UcastniciDigest = ({ actionPrefix, reduxName, roky, ucastniciDigest }) => {
  const columns = [
    {
      cellStyler: alignLeftStyler,
      key: 'prijmeni',
      label: 'příjmení',
      sortable: true,
      width: 100
    },
    { cellStyler: alignLeftStyler, key: 'jmeno', label: 'jméno', sortable: true, width: 90 },
    {
      cellStyler: alignRightStyler,
      key: 'narozeni',
      label: 'narození',
      sortable: true,
      width: 100
    },
    ...roky.map(rok => ({
      cellDataFormatter: vykonCellDataFormatter,
      cellStyler: vykonCellStyler,
      key: `${rok}`,
      label: rok,
      sortable: false,
      width: 50
    }))
  ];

  return (
    <div className="UcastniciDigest_div UcastniciTable_container">
      <FilterableContainer
        actionPrefix={actionPrefix}
        reduxName={reduxName}
        numberOfItems={ucastniciDigest.length}
      />

      <UcastniciTableContainer
        actionPrefix={actionPrefix}
        columns={columns}
        data={ucastniciDigest}
        fixedColumnCount={3}
        reduxName={reduxName}
        rowHeight={35}
      />
    </div>
  );
};

UcastniciDigest.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  roky: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  ucastniciDigest: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default UcastniciDigest;
