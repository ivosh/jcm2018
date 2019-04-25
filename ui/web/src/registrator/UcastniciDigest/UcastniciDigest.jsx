import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import convertDuration from 'ui-common/convertDuration';
import { narozeniToStr } from '../../Util';
import FilterableContainer from '../Filterable/FilterableContainer';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import './UcastniciDigest.css';

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

const vykonCellDataFormatter = ({ cellData }) => {
  if (cellData) {
    if (cellData.dokonceno === true) {
      return '✓';
    }
    if (cellData.dokonceno === false) {
      return '✗';
    }
    return '?';
  }
  return '';
};

const casFormat = cas => {
  if (cas) {
    const { hours, mins, secs, subsecs } = convertDuration(moment.duration(cas));
    return `${hours}:${mins}:${secs},${subsecs}`;
  }
  return undefined;
};

const vykonRenderer = args => {
  const cas = casFormat(args.cellData && args.cellData.cas);
  const className = cas
    ? args.rowIndex === 0
      ? `${args.className} AnimatedTooltip--bottom`
      : `${args.className} AnimatedTooltip--top`
    : args.className;

  return (
    <div className={className} key={args.key} style={args.style} tooltip-text={cas}>
      {args.formattedCellData}
    </div>
  );
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
      cellRenderer: vykonRenderer,
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
      }).isRequired,
      vykon: PropTypes.shape({
        cas: PropTypes.string,
        dokonceno: PropTypes.bool
      })
    }).isRequired
  ).isRequired
};

export default UcastniciDigest;
