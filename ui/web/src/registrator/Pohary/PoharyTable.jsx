import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import { narozeniToStr } from '../../Util';
import TextFilter from '../Filterable/TextFilter';
import Zobrazeno from '../Filterable/Zobrazeno';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import { POHAR_NAROK, POHAR_NEPREVZATO, POHAR_PREDANO } from './PoharyActions';
import DroppablePohary from './DroppablePohary';
import './PoharyTable.css';

const poharyRenderer = (args) => (
  <DroppablePohary
    className={args.className}
    count={args.count}
    id={args.data[args.rowIndex].id}
    key={args.key}
    style={args.style}
    type={args.type}
    canDrop={args.canDrop}
    onDrop={args.onDrop}
  />
);

const narokRenderer = (args) =>
  poharyRenderer({
    count: args.data[args.rowIndex].pohary.narok ? 1 : 0,
    type: POHAR_NAROK,
    ...args,
  });

const neprevzatoRenderer = (args) =>
  poharyRenderer({
    count: args.data[args.rowIndex].pohary[args.columnKey],
    type: POHAR_NEPREVZATO,
    ...args,
  });

const predanoRenderer = (args) =>
  poharyRenderer({
    count: args.data[args.rowIndex].pohary[args.columnKey],
    type: POHAR_PREDANO,
    ...args,
  });

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

const prijmeniFormat = (args) => (
  <Link to={`/prihlasky/${args.data[args.rowIndex].id}`}>{args.cellData}</Link>
);

const ROKU_NA_RADKU = 5;
const ucastiRenderer = (args) => {
  const dokoncene = args.cellData.dokoncene.slice().sort();
  const className =
    dokoncene.length > 0
      ? args.rowIndex <= 2
        ? `${args.className} AnimatedTooltip--bottom`
        : `${args.className} AnimatedTooltip--top`
      : args.className;

  let roky = '';
  if (dokoncene.length > 0) {
    roky = 'dokončené maratonské účasti:\n';
    while (dokoncene.length > 0) {
      roky += dokoncene.splice(0, ROKU_NA_RADKU).join(' | ');
      if (dokoncene.length > 0) {
        roky += '\n';
      }
    }
  }

  return (
    <div className={className} key={args.key} style={args.style} tooltip-text={roky}>
      {args.formattedCellData}
    </div>
  );
};

const ucastiFormat = ({ cellData }) => cellData.dokoncene.length;

const PoharyTable = ({
  actionPrefix,
  narokovaneFilter,
  neprevzateFilter,
  pohary,
  popisek,
  reduxName,
  textFilter,
  canDrop,
  onDrop,
  onNarokovaneFilterChange,
  onNeprevzateFilterChange,
  onTextFilterChange,
}) => {
  const columns = [
    {
      cellClassNames: () => ['align-left'],
      cellDataFormatter: prijmeniFormat,
      key: 'prijmeni',
      label: 'příjmení',
      sortable: true,
      width: 100,
    },
    {
      cellClassNames: () => ['align-left'],
      key: 'jmeno',
      label: 'jméno',
      sortable: true,
      width: 90,
    },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: narozeniFormat,
      key: 'narozeni',
      label: 'narození',
      sortable: true,
      width: 100,
    },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: ucastiFormat,
      cellRenderer: ucastiRenderer,
      key: 'ucasti',
      label: 'účastí',
      sortable: true,
      width: 100,
    },
    {
      cellRenderer: predanoRenderer,
      key: 'predano',
      label: 'předáno',
      sortable: true,
      width: 100,
    },
    {
      cellRenderer: neprevzatoRenderer,
      key: 'neprevzato',
      label: 'nepřevzato',
      sortable: true,
      width: 120,
    },
    {
      cellRenderer: narokRenderer,
      key: 'narok',
      label: 'nárok?',
      sortable: true,
      width: 100,
    },
  ];

  return (
    <div className="PoharyTable__div UcastniciTable_container">
      <p>
        Jsou zobrazeni pouze účastníci, kteří buďto maraton alespoň jednou dokončili anebo {popisek}
        . To je dále ještě možné poštelovat filtry.
      </p>
      <div>
        <TextFilter filter={textFilter} onChange={onTextFilterChange} />

        <span className="PoharyTable__buttons Bootstrap-buttons--active">
          <Button active={narokovaneFilter} bsStyle="success" onClick={onNarokovaneFilterChange}>
            <Glyphicon glyph="download" /> Nárok na pohár
          </Button>
          <span>+</span>
          <Button active={neprevzateFilter} bsStyle="info" onClick={onNeprevzateFilterChange}>
            <Glyphicon glyph="upload" /> Nepřevzatý pohár
          </Button>
        </span>

        <Zobrazeno numberOfItems={pohary.length} />
      </div>

      <UcastniciTableContainer
        actionPrefix={actionPrefix}
        columns={columns}
        data={pohary}
        fixedColumnCount={3}
        reduxName={reduxName}
        rowHeight={35}
        canDrop={canDrop}
        onDrop={onDrop}
      />
    </div>
  );
};

PoharyTable.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  narokovaneFilter: PropTypes.bool.isRequired,
  neprevzateFilter: PropTypes.bool.isRequired,
  pohary: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        den: PropTypes.number,
        mesic: PropTypes.number,
        rok: PropTypes.number.isRequired,
      }).isRequired,
      pohary: PropTypes.shape({
        narok: PropTypes.bool.isRequired,
        predano: PropTypes.number.isRequired,
        neprevzato: PropTypes.number.isRequired,
      }),
      ucasti: PropTypes.shape({
        dokoncene: PropTypes.arrayOf(PropTypes.number).isRequired,
        prihlaseno: PropTypes.bool.isRequired,
        odstartovano: PropTypes.bool.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
  popisek: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  textFilter: PropTypes.string.isRequired,
  canDrop: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
  onNarokovaneFilterChange: PropTypes.func.isRequired,
  onNeprevzateFilterChange: PropTypes.func.isRequired,
  onTextFilterChange: PropTypes.func.isRequired,
};

export default PoharyTable;
