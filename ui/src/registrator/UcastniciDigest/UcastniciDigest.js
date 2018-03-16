import React from 'react';
import PropTypes from 'prop-types';
import { narozeniToStr } from '../../Util';
import FilterableContainer from '../Filterable/FilterableContainer';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import './UcastniciDigest.css';

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

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

const UcastniciDigest = ({ actionPrefix, reduxName, roky, ucastniciDigest }) => {
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
    ...roky.map(rok => ({
      cellClassNames: ({ cellData }) =>
        cellData ? [`UcastniciDigest--${cellData.kategorie}`] : [],
      cellDataFormatter: vykonCellDataFormatter,
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
      narozeni: PropTypes.shape({
        den: PropTypes.number,
        mesic: PropTypes.number,
        rok: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ).isRequired
};

export default UcastniciDigest;
