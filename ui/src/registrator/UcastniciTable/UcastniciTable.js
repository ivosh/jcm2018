import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, Grid, ScrollSync } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import './UcastniciTable.css';

const columnCount = 50;
const rowCount = 1000;

class UcastniciTable extends PureComponent {
  state = {
    columnWidth: 75,
    overscanColumnCount: 0,
    overscanRowCount: 5,
    rowHeight: 35,
    fixedColumnCount: 3,
    header: Array.apply(null, { length: rowCount }).map((elem, idx) => `H${idx}`),
    data: Array.apply(null, { length: rowCount }).map((elem1, rowIdx) =>
      Array.apply(null, { length: columnCount }).map((elem2, colIdx) => `${rowIdx} - ${colIdx}`)
    )
  };

  renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < this.fixedColumnCount) {
      return undefined;
    }

    return this.renderLeftSideCell({ columnIndex, key, rowIndex, style });
  };

  renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < this.fixedColumnCount) {
      return undefined;
    }

    return this.renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
  };

  renderLeftHeaderCell = ({ columnIndex, key, style }) => (
    <div className="UcastniciTable_headerCell" key={key} style={style}>
      {this.state.header[columnIndex]}
    </div>
  );

  renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => {
    const rowClass = rowIndex % 2 === 1 ? 'UcastniciTable_evenRow' : 'UcastniciTable_oddRow';
    const classNames = `${rowClass} UcastniciTable_cell`;

    return (
      <div className={classNames} key={key} style={style}>
        {this.state.data[rowIndex][columnIndex]}
      </div>
    );
  };

  render() {
    const {
      columnWidth,
      fixedColumnCount,
      overscanColumnCount,
      overscanRowCount,
      rowHeight
    } = this.state;
    const height = this.props.containerHeight - scrollbarSize() - rowHeight;

    return (
      <ScrollSync>
        {({ clientHeight, onScroll, scrollLeft, scrollTop }) => (
          <div className="UcastniciTable_GridRow">
            <div
              className="UcastniciTable_LeftSideGridContainer"
              style={{
                top: 0,
                flexBasis: `${fixedColumnCount * columnWidth}px`
              }}
            >
              <Grid
                cellRenderer={this.renderLeftHeaderCell}
                className="UcastniciTable_HeaderGrid"
                columnCount={fixedColumnCount}
                columnWidth={columnWidth}
                height={rowHeight}
                rowCount={1}
                rowHeight={rowHeight}
                width={3 * columnWidth}
              />
            </div>
            <div
              className="UcastniciTable_LeftSideGridContainer"
              style={{
                top: rowHeight,
                flexBasis: `${fixedColumnCount * columnWidth}px`
              }}
            >
              <Grid
                cellRenderer={this.renderLeftSideCell}
                className="UcastniciTable_LeftSideGrid"
                columnCount={fixedColumnCount}
                columnWidth={columnWidth}
                height={clientHeight - scrollbarSize()}
                overscanColumnCount={overscanColumnCount}
                overscanRowCount={overscanRowCount}
                rowCount={rowCount}
                rowHeight={rowHeight}
                scrollTop={scrollTop}
                width={fixedColumnCount * columnWidth}
              />
            </div>
            <div className="UcastniciTable_GridColumn">
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div>
                    <div
                      style={{
                        height: rowHeight,
                        width: width - scrollbarSize()
                      }}
                    >
                      <Grid
                        cellRenderer={this.renderHeaderCell}
                        className="UcastniciTable_HeaderGrid"
                        columnCount={columnCount}
                        columnWidth={columnWidth}
                        height={rowHeight}
                        overscanColumnCount={overscanColumnCount}
                        rowHeight={rowHeight}
                        rowCount={1}
                        scrollLeft={scrollLeft}
                        width={width - scrollbarSize()}
                      />
                    </div>
                    <div
                      style={{
                        height,
                        width
                      }}
                    >
                      <Grid
                        cellRenderer={this.renderBodyCell}
                        className="UcastniciTable_BodyGrid"
                        columnCount={columnCount}
                        columnWidth={columnWidth}
                        height={height}
                        onScroll={onScroll}
                        overscanColumnCount={overscanColumnCount}
                        overscanRowCount={overscanRowCount}
                        rowCount={rowCount}
                        rowHeight={rowHeight}
                        width={width}
                      />
                    </div>
                  </div>
                )}
              </AutoSizer>
            </div>
          </div>
        )}
      </ScrollSync>
    );
  }
}

/*
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import { barvaProTypKategorie } from '../../Util';
import LoadingIndicator from '../../shared/LoadingIndicator';
import { SortDirTypes } from './ucastniciDigestReducer';
import './UcastniciDigestTable.css';

const rowClassName = ({index}) => {
  if (index < 0) {
    return 'UcastniciDigestTable_header';
  }
  return index %2 === 0 ? 'UcastniciDigestTable_evenRow' : 'UcastniciDigestTable_oddRow';
}

const vykonCellDataGetter = ({ columnData, dataKey, rowData }) => {
  const cell = rowData[dataKey];
  if (cell) {
    if (cell.dokonceno === true) {
      return '✓';
    } else if (cell.dokonceno === false) {
      return '✗';
    }
    return '?';
  }
  return '';
};

const vykonCellRenderer = ({ cellData, columnData, columnIndex, dataKey, rowData, rowIndex }) => {
  const cell = rowData[dataKey];
  if (cell) {
    const style = {
      backgroundColor: barvaProTypKategorie(cell.kategorie)
    };
    return <div className="UcastniciDigestTable_vykon" style={style}>{cellData}</div>;
  }
  return '';
}

class UcastniciDigest extends PureComponent {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  rowGetter = ({ index }) => this.props.ucastniciDigest[index];

  render = () => {
    const {
      roky,
      ucastniciDigest,
      fetching,
      onSortDirChange,
      sortColumn,
      sortDir,
      containerWidth,
      containerHeight
    } = this.props;

    if (fetching) {
      return (
        <div>
          <LoadingIndicator /> Účastníci se načítají...
        </div>
      );
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
        headerHeight={35}
        rowHeight={35}
        height={800} // :TODO:
        width={1200} // :TODO:
        rowCount={ucastniciDigest.length}
        rowGetter={this.rowGetter}
        headerClassName="UcastniciDigestTable_headerColumn"
        rowClassName={rowClassName}
        // :TODO: sort, sortBy, sortDirection
      >
        {columns.map(({ key, label, width, vykon }) => {
          if (vykon === false) {
            // :TODO: sort
            return <Column key={key} label={label} dataKey={key} width={width} flexGrow={1} />;
          }
          return <Column key={key} label={label} dataKey={key} width={width} disableSort
          cellDataGetter={vykonCellDataGetter} cellRenderer={vykonCellRenderer} />;
        })}
      </Table>
    );
  };
}
*/

UcastniciTable.propTypes = {
  roky: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  ucastniciDigest: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  fetching: PropTypes.bool,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  fetchUcastnici: PropTypes.func.isRequired,
  onSortDirChange: PropTypes.func.isRequired,
  containerHeight: PropTypes.number.isRequired
};

/*
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
};
*/

export default UcastniciTable;
