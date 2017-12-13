import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Cell, Column, Table } from 'fixed-data-table-2';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import SortHeaderCell from './SortHeaderCell';
import './Ucastnici.css';

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
  columnKey: PropTypes.string
};

class Ucastnici extends Component {
  constructor(props) {
    super(props);

    const columns = [
      { key: 'prijmeni', label: 'příjmení', width: 100 },
      { key: 'jmeno', label: 'jméno', width: 100 },
      { key: 'narozeni', label: 'narození', width: 100 }
    ];

    this.state = { columns };
  }

  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  onSortChange = (columnKey, sortType) => {
    console.log(columnKey, sortType);
  };

  render = () => {
    const { containerWidth, containerHeight, ucastnici } = this.props;
    const { columns } = this.state;

    if (ucastnici.length === 0) {
      return <div className="Ucastnici">žádný účastník</div>;
    }

    return (
      <Table
        // :TODO: highlight currently hovered row
        data={ucastnici}
        rowsCount={ucastnici.length}
        rowHeight={50}
        headerHeight={50}
        width={containerWidth}
        height={containerHeight}
        keyboardScrollEnabled
        keyboardPageEnabled
      >
        {columns.map(column => (
          <Column
            key={column.key}
            columnKey={column.key}
            header={
              <SortHeaderCell onSortChange={this.onSortChange}>{column.label}</SortHeaderCell>
            }
            cell={<TextCell data={ucastnici} />}
            width={column.width}
          />
        ))}
      </Table>
    );
  };
}

Ucastnici.propTypes = {
  ucastnici: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  fetchUcastnici: PropTypes.func.isRequired,
  containerWidth: PropTypes.number.isRequired,
  containerHeight: PropTypes.number.isRequired
};

export default Ucastnici;
