import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, Grid, ScrollSync } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import { SortDirTypes } from '../../Util';
import SortHeader from './SortHeader';
import './UcastniciTable.css';

class UcastniciTable extends PureComponent {
  columnWidth = ({ index }) => this.props.columns[index].width;

  fixedColumnsWidth = () =>
    this.props.columns
      .slice(0, this.props.fixedColumnCount)
      .reduce((sum, column) => sum + column.width, 0);

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
    const { columns, data, fixedColumnCount, rowHeight } = this.props;
    const overscanColumnCount = 0;
    const overscanRowCount = 5;

    const columnCount = columns.length;
    const fixedColumnsWidth = this.fixedColumnsWidth();
    const rowCount = data.length;
    const height = this.props.containerHeight - scrollbarSize() - rowHeight;

    // :TODO: highlight currently hovered row
    return (
      <ScrollSync>
        {({ clientHeight, onScroll, scrollLeft, scrollTop }) => (
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
                height={clientHeight - scrollbarSize()}
                overscanColumnCount={overscanColumnCount}
                overscanRowCount={overscanRowCount}
                rowCount={rowCount}
                rowHeight={rowHeight}
                scrollTop={scrollTop}
                width={fixedColumnsWidth}
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
                )}
              </AutoSizer>
            </div>
          </div>
        )}
      </ScrollSync>
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
