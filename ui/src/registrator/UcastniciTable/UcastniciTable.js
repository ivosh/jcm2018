import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, ScrollSync } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import { SortDirTypes } from '../../sort';
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

const calculateWidth = ({
  allColumnsWidth,
  containerWidth,
  verticalScrollbarSize,
  verticalScrollbarVisible
}) => {
  let width = allColumnsWidth < containerWidth ? allColumnsWidth : containerWidth;
  if (verticalScrollbarVisible) {
    width += verticalScrollbarSize;
  }
  return width;
};

const defaultCellRenderer = args => (
  <div className={args.className} key={args.key} style={args.style}>
    {args.formattedCellData}
  </div>
);

class UcastniciTable extends PureComponent {
  columnWidth = ({ index }) => this.props.columns[index].width;

  columnsWidth = columnCount =>
    this.props.columns.slice(0, columnCount).reduce((sum, column) => sum + column.width, 0);

  customProps = () => {
    const {
      columns,
      containerHeight,
      containerWidth,
      data,
      fixedColumnCount,
      rowHeight,
      sortColumn,
      sortDir,
      onSortDirChange,
      ...rest
    } = this.props;
    return rest;
  };

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

    const { columns, data } = this.props;
    const customProps = this.customProps();
    const { cellClassNames, cellDataFormatter, cellRenderer, cellStyler, key: columnKey } = columns[
      columnIndex
    ];
    const cellData = data[rowIndex][columnKey];
    const classNames = cellClassNames
      ? cellClassNames({ cellData, data, rowIndex, columnKey, ...customProps })
      : [];
    classNames.push(rowClass, 'UcastniciTable_cell');
    const formattedCellData = cellDataFormatter
      ? cellDataFormatter({ cellData, data, rowIndex, columnKey, ...customProps })
      : cellData;
    const cellStyle = cellStyler
      ? cellStyler({ cellData, columnKey, data, rowIndex, ...customProps })
      : {};
    const mergedStyle = { ...style, ...cellStyle };

    const renderer = cellRenderer || defaultCellRenderer;
    return renderer({
      cellData,
      className: classNames.join(' '),
      columnKey,
      data,
      formattedCellData,
      key,
      rowIndex,
      style: mergedStyle,
      ...customProps
    });
  };

  render() {
    const {
      columns,
      containerHeight,
      containerWidth,
      data,
      fixedColumnCount,
      rowHeight
    } = this.props;
    const overscanColumnCount = 0;
    const overscanRowCount = 5;

    const columnCount = columns.length;
    const allColumnsWidth = this.columnsWidth(columnCount);
    const fixedColumnsWidth = this.columnsWidth(fixedColumnCount);
    const rowCount = data.length;

    const horizontalScrollbarVisible = allColumnsWidth > containerWidth;
    const height = calculateHeight({
      containerHeight,
      horizontalScrollbarSize: scrollbarSize(),
      horizontalScrollbarVisible,
      rowHeight,
      rowCount
    });

    const verticalScrollbarVisible = rowHeight * rowCount > containerHeight;
    const width = calculateWidth({
      containerWidth,
      allColumnsWidth,
      verticalScrollbarSize: scrollbarSize(),
      verticalScrollbarVisible
    });

    // Child components need to re-render if interestingProps change.
    const { onSortDirChange, ...interestingProps } = this.props;

    // :TODO: highlight currently hovered row
    return (
      <ScrollSync {...interestingProps}>
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
                {...interestingProps}
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
                {...interestingProps}
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
                    width={width - (verticalScrollbarVisible ? scrollbarSize() : 0)}
                    {...interestingProps}
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
                    {...interestingProps}
                  />
                </div>
              </div>
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
      // cellClassNames = ({ cellData, columnKey, data, rowIndex }) => [className]
      cellClassNames: PropTypes.func,
      // cellDataFormatter = ({ cellData, columnKey, data, rowIndex }) => formattedData
      cellDataFormatter: PropTypes.func,
      // cellRenderer = ({ cellData, className, columnKey, data, formattedCellData,
      //                    key, rowIndex, style }) => React element
      // Note that cellClassNames, cellDataFormatter and cellStyler are still called but the actual
      // rendering is left to cellRenderer. Properties 'key', 'className' and 'style' must be set
      // on the rendered element.
      cellRenderer: PropTypes.func,
      cellStyler: PropTypes.func, // ({ cellData, columnKey, data, rowIndex }) => style
      key: PropTypes.string.isRequired,
      label: PropTypes.node,
      sortable: PropTypes.bool,
      width: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  containerHeight: PropTypes.number.isRequired,
  containerWidth: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fixedColumnCount: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  sortColumn: PropTypes.string,
  sortDir: PropTypes.string,
  onSortDirChange: PropTypes.func
  // + any other custom props you want to pass to cellClassNames, cellDataFormatter, cellRenderer,
  // and cellStyler
};

export default UcastniciTable;
