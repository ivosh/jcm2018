import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell, Column, Table } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import { barvaProTypKategorie } from '../../Util';
import { SortDirTypes } from './ucastniciDigestReducer';
import SortHeaderCell from './SortHeaderCell';
import './UcastniciDigestTable.css';

const TextCell = ({ data, rowIndex, columnKey }) => <Cell>{data[rowIndex][columnKey]}</Cell>;
TextCell.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string.isRequired
};

const VykonCell = ({ data, rowIndex, columnKey }) => {
  const cell = data[rowIndex][columnKey];
  if (cell) {
    let text;
    if (cell.dokonceno === true) {
      text = '✓';
    } else if (cell.dokonceno === false) {
      text = '✗';
    } else {
      text = '?';
    }
    const style = {
      backgroundColor: barvaProTypKategorie(cell.kategorie)
    };
    return (
      <Cell style={style} className="UcastniciDigestTable_vykon">
        {text}
      </Cell>
    );
  }
  return <Cell />;
};
VykonCell.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf((propValue, key) => {
      // rok, například 2001, 2017 apod.
      if (key.startsWith('20')) {
        return PropTypes.shape({
          kategorie: PropTypes.string.isRequired,
          dokonceno: PropTypes.bool
        });
      }
      return undefined;
    }).isRequired
  ).isRequired,
  rowIndex: PropTypes.number,
  columnKey: PropTypes.string.isRequired
};

class UcastniciDigest extends Component {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  render = () => {
    const {
      roky,
      ucastniciDigest,
      isFetching,
      onSortDirChange,
      sortColumn,
      sortDir,
      containerWidth,
      containerHeight
    } = this.props;

    if (isFetching) {
      return <div>Účastníci se načítají...</div>;
    }

    const columns = [
      { key: 'prijmeni', label: 'příjmení', width: 100, vykon: false },
      { key: 'jmeno', label: 'jméno', width: 90, vykon: false },
      { key: 'narozeni', label: 'narození', width: 100, vykon: false },
      ...roky.map(rok => ({ key: `${rok}`, label: rok, width: 45, vykon: true }))
    ];

    return (
      <Table
        // :TODO: highlight currently hovered row
        data={ucastniciDigest}
        rowsCount={ucastniciDigest.length}
        rowHeight={35}
        headerHeight={35}
        width={containerWidth}
        height={containerHeight}
        keyboardScrollEnabled
        keyboardPageEnabled
      >
        {columns.map(({ key, label, width, vykon }) => {
          const commonProps = {
            columnKey: key,
            width,
            allowCellsRecycling: true,
            pureRendering: true
          };

          if (vykon === false) {
            return (
              <Column
                key={key}
                {...commonProps}
                flexGrow={1}
                header={
                  <SortHeaderCell
                    columnKey={key}
                    onSortDirChange={() => onSortDirChange(key)}
                    sortDir={sortColumn === key ? sortDir : SortDirTypes.NONE}
                  >
                    {label}
                  </SortHeaderCell>
                }
                cell={<TextCell columnKey={key} data={ucastniciDigest} />}
              />
            );
          }
          return (
            <Column
              key={key}
              {...commonProps}
              header={<Cell>{label}</Cell>}
              cell={<VykonCell columnKey={key} data={ucastniciDigest} />}
            />
          );
        })}
      </Table>
    );
  };
}

UcastniciDigest.propTypes = {
  roky: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  ucastniciDigest: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  isFetching: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  fetchUcastnici: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired
};

export default UcastniciDigest;
