import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { barvaProTypKategorie } from '../../Util';
import LoadingIndicator from '../../shared/LoadingIndicator';
import UcastniciTable from '../UcastniciTable/UcastniciTable';

const alignLeftStyler = () => ({ textAlign: 'left' });
const alignRightStyle = () => ({ textAlign: 'right' });

const vykonCellDataFormatter = ({ cellData }) => {
  if (cellData) {
    if (cellData.dokonceno === true) {
      return '✓';
    } else if (cellData.dokonceno === false) {
      return '✗';
    }
    return '?';
  }
  return '';
};

const vykonCellStyler = ({ cellData }) => {
  if (cellData) {
    return {
      backgroundColor: barvaProTypKategorie(cellData.kategorie)
    };
  }
  return {};
};

class UcastniciDigest extends PureComponent {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  render = () => {
    const { fetching, roky, onSortDirChange, sortColumn, sortDir, ucastniciDigest } = this.props;

    if (fetching) {
      return (
        <div>
          <LoadingIndicator /> Účastníci se načítají...
        </div>
      );
    }

    const columns = [
      {
        cellStyler: alignLeftStyler,
        key: 'prijmeni',
        label: 'příjmení',
        sortable: true,
        width: 100
      },
      { cellStyler: alignLeftStyler, key: 'jmeno', label: 'jméno', sortable: true, width: 90 },
      {
        cellStyler: alignRightStyle,
        key: 'narozeni',
        label: 'narození',
        sortable: true,
        width: 100
      },
      ...roky.map(rok => ({
        cellDataFormatter: vykonCellDataFormatter,
        cellStyler: vykonCellStyler,
        key: `${rok}`,
        label: rok,
        sortable: false,
        width: 50
      }))
    ];

    return (
      <UcastniciTable
        columns={columns}
        containerHeight={window.innerHeight - 130} // navigation and filtering components
        data={ucastniciDigest}
        fixedColumnCount={3}
        rowHeight={35}
        sortColumn={sortColumn}
        sortDir={sortDir}
        onSortDirChange={onSortDirChange}
      />
    );
  };
}

UcastniciDigest.propTypes = {
  fetching: PropTypes.bool,
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
  onSortDirChange: PropTypes.func.isRequired
};

export default UcastniciDigest;
