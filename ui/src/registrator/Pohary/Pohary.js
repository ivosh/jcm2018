import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import { narozeniToStr } from '../../Util';
import TextFilter from '../Filterable/TextFilter';
import Zobrazeno from '../Filterable/Zobrazeno';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import Pohar from './Pohar';
import './Pohary.css';

const poharyFormat = pocet => (
  <div>
    {Array(pocet)
      .fill(1)
      .map((val, index) => (
        <Pohar key={index} sizePercentage={4} />
      ))}
  </div>
);

const narokFormat = args => (args.data[args.rowIndex].pohary.narok ? poharyFormat(1) : <div />);

const poharFormat = ({ columnKey, data, rowIndex }) =>
  poharyFormat(data[rowIndex].pohary[columnKey]);

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

const prijmeniFormat = args => (
  <Link to={`/prihlasky/${args.data[args.rowIndex].id}`}>{args.cellData}</Link>
);

const ucastiFormat = ({ cellData }) => cellData.dokoncene.length;

const Pohary = ({
  actionPrefix,
  narokovaneFilter,
  neprevzateFilter,
  pohary,
  reduxName,
  textFilter,
  onNarokovaneFilterChange,
  onNeprevzateFilterChange,
  onTextFilterChange
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
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: ucastiFormat,
      key: 'ucasti',
      label: 'účastí',
      sortable: true,
      width: 100
    },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: poharFormat,
      key: 'predano',
      label: 'předáno',
      sortable: true,
      width: 100
    },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: poharFormat,
      key: 'neprevzato',
      label: 'nepřevzato',
      sortable: true,
      width: 100
    },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: narokFormat,
      key: 'narok',
      label: 'nárok?',
      sortable: true,
      width: 100
    }
  ];

  return (
    <div className="Pohary__div UcastniciTable_container">
      <p>
        Jsou zobrazeni pouze účastníci, kteří buďto maraton alespoň jednou dokončili anebo se na něj
        přihlásili. To je dále ještě možné poštelovat filtry.
      </p>
      <div>
        <TextFilter filter={textFilter} onChange={onTextFilterChange} />

        <span className="Pohary__buttons Bootstrap-buttons--active">
          <Button
            active={narokovaneFilter}
            bsStyle="success"
            className="Pohary__button"
            onClick={onNarokovaneFilterChange}
          >
            <Glyphicon glyph="download" /> Nárok na pohár
          </Button>
          <Button
            active={neprevzateFilter}
            bsStyle="info"
            className="Pohary__button"
            onClick={onNeprevzateFilterChange}
          >
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
      />
    </div>
  );
};

Pohary.propTypes = {
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
        rok: PropTypes.number.isRequired
      }).isRequired,
      ucasti: PropTypes.shape({
        dokoncene: PropTypes.arrayOf(PropTypes.number).isRequired,
        prihlaseno: PropTypes.bool.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  reduxName: PropTypes.string.isRequired,
  textFilter: PropTypes.string.isRequired,
  onNarokovaneFilterChange: PropTypes.func.isRequired,
  onNeprevzateFilterChange: PropTypes.func.isRequired,
  onTextFilterChange: PropTypes.func.isRequired
};

export default Pohary;
