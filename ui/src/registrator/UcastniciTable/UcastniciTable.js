import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, Grid, ScrollSync } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import { SortDirTypes } from '../../Util';
import SortHeader from './SortHeader';
import './UcastniciTable.css';

const calculateHeight = ({
  containerHeight,
  horizontalScrollbarSize,
  horizontalScrollbarVisible,
  rowHeight,
  rowCount
}) => {
  let height = containerHeight - horizontalScrollbarSize - rowHeight;
  if (height % rowHeight < rowHeight / 2) {
    height -= height % rowHeight;
  }
  if (rowCount * rowHeight < height) {
    height = rowCount * rowHeight;
  }
  if (horizontalScrollbarVisible) {
    height += horizontalScrollbarSize;
  }
  return height;
};

class UcastniciTable extends PureComponent {
  columnWidth = ({ index }) => this.props.columns[index].width;

  columnsWidth = columnCount =>
    this.props.columns.slice(0, columnCount).reduce((sum, column) => sum + column.width, 0);

  renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < this.props.fixedColumnCount) {
      return undefined;
    }

    return this.renderLeftSideCell({ columnIndex, key, rowIndex, style });
  };

  renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < this.props.fixedColumnCount) {
      return undefined;
    }

    return this.renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
  };

  renderLeftHeaderCell = ({ columnIndex, key, style }) => {
    const column = this.props.columns[columnIndex];
    const { sortColumn, sortDir, onSortDirChange } = this.props;
    const label = column.label || column.key;
    const sorting = column.sortable && column.key === sortColumn;

    return (
      <div className="UcastniciTable_headerCell" key={key} style={style}>
        {column.sortable ? (
          <SortHeader
            sortDir={sorting ? sortDir : SortDirTypes.NONE}
            onClick={() => onSortDirChange(column.key)}
          >
            {label}
          </SortHeader>
        ) : (
          label
        )}
      </div>
    );
  };

  renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => {
    const rowClass = rowIndex % 2 === 1 ? 'UcastniciTable_evenRow' : 'UcastniciTable_oddRow';
    const classNames = `${rowClass} UcastniciTable_cell`;

    const { columns, data } = this.props;
    const { cellDataFormatter, cellStyler, key: columnKey } = columns[columnIndex];
    const cellData = data[rowIndex][columnKey];
    const formattedData = cellDataFormatter ? cellDataFormatter({ cellData }) : cellData;
    const cellStyle = cellStyler ? cellStyler({ cellData }) : {};
    const mergedStyle = { ...style, ...cellStyle };

    return (
      <div className={classNames} key={key} style={mergedStyle}>
        {formattedData}
      </div>
    );
  };

  render() {
    const { columns, containerHeight, data, fixedColumnCount, rowHeight } = this.props;
    const overscanColumnCount = 0;
    const overscanRowCount = 5;

    const columnCount = columns.length;
    const allColumnsWidth = this.columnsWidth(columnCount);
    const fixedColumnsWidth = this.columnsWidth(fixedColumnCount);
    const rowCount = data.length;

    // :TODO: highlight currently hovered row
    // :TODO: let AutoSizer manage height as well:
    // https://github.com/bvaughn/react-virtualized/blob/master/docs/usingAutoSizer.md
    return (
      <AutoSizer disableHeight>
        {({ width }) => {
          const horizontalScrollbarVisible = allColumnsWidth > width;
          const height = calculateHeight({
            containerHeight,
            horizontalScrollbarSize: scrollbarSize(),
            horizontalScrollbarVisible,
            rowHeight,
            rowCount
          });
          return (
            <ScrollSync>
              {({ onScroll, scrollLeft, scrollTop }) => (
                <div className="UcastniciTable_GridRow">
                  <div
                    className="UcastniciTable_LeftSideGridContainer"
                    style={{
                      top: 0,
                      flexBasis: `${fixedColumnsWidth}px`
                    }}
                  >
                    <Grid
                      cellRenderer={this.renderLeftHeaderCell}
                      className="UcastniciTable_HeaderGrid"
                      columnCount={fixedColumnCount}
                      columnWidth={this.columnWidth}
                      height={rowHeight}
                      rowCount={1}
                      rowHeight={rowHeight}
                      width={fixedColumnsWidth}
                    />
                  </div>
                  <div
                    className="UcastniciTable_LeftSideGridContainer"
                    style={{
                      top: rowHeight,
                      flexBasis: `${fixedColumnsWidth}px`
                    }}
                  >
                    <Grid
                      cellRenderer={this.renderLeftSideCell}
                      className="UcastniciTable_LeftSideGrid"
                      columnCount={fixedColumnCount}
                      columnWidth={this.columnWidth}
                      height={height - (horizontalScrollbarVisible ? scrollbarSize() : 0)}
                      overscanColumnCount={overscanColumnCount}
                      overscanRowCount={overscanRowCount}
                      rowCount={rowCount}
                      rowHeight={rowHeight}
                      scrollTop={scrollTop}
                      width={fixedColumnsWidth}
                    />
                  </div>
                  <div className="UcastniciTable_GridColumn">
                    <div>
                      <div
                        style={{
                          height: rowHeight,
                          width: width - fixedColumnsWidth - scrollbarSize()
                        }}
                      >
                        <Grid
                          cellRenderer={this.renderHeaderCell}
                          className="UcastniciTable_HeaderGrid"
                          columnCount={columnCount}
                          columnWidth={this.columnWidth}
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
                          columnWidth={this.columnWidth}
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
                  </div>
                </div>
              )}
            </ScrollSync>
          );
        }}
      </AutoSizer>
    );
  }
}

UcastniciTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      cellDataFormatter: PropTypes.func, // ({ cellData }) => formattedData
      cellStyler: PropTypes.func, // ({ cellData }) => style
      key: PropTypes.string.isRequired,
      label: PropTypes.node,
      sortable: PropTypes.bool,
      width: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  containerHeight: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fixedColumnCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  onSortDirChange: PropTypes.func
};

export default UcastniciTable;
