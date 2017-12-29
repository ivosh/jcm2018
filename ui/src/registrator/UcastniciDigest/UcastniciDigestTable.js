import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell, Column, Table } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import { SortDirTypes } from './ucastniciDigestReducer';
import SortHeaderCell from './SortHeaderCell';

// TODO: extend from React.PureComponent and implement render?
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

class UcastniciDigest extends Component {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  render = () => {
    const {
      roky,
      ucastniciDigest,
      onSortDirChange,
      sortColumn,
      sortDir,
      containerWidth,
      containerHeight
    } = this.props;

    if (ucastniciDigest.length === 0) {
      // :TODO: display "načítáme"
      return <div className="Ucastnici">žádný účastník</div>;
    }

    const columns = [
      { key: 'prijmeni', label: 'příjmení', width: 100 },
      { key: 'jmeno', label: 'jméno', width: 90 },
      { key: 'narozeni', label: 'narození', width: 100 },
      ...roky.map(rok => ({ key: `${rok}`, label: rok, width: 50 }))
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
        {columns.map(column => (
          <Column
            key={column.key}
            columnKey={column.key}
            width={column.width}
            flexGrow={1}
            header={
              <SortHeaderCell
                columnKey={column.key}
                onSortDirChange={() => onSortDirChange(column.key)}
                sortDir={sortColumn === column.key ? sortDir : SortDirTypes.NONE}
              >
                {column.label}
              </SortHeaderCell>
            }
            cell={<TextCell columnKey={column.key} data={ucastniciDigest} />}
          />
        ))}
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
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  fetchUcastnici: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired
};

export default UcastniciDigest;
