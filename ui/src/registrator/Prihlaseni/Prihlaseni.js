import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { barvaProTypKategorie, kategorieToStr } from '../../Util';
import LoadingIndicator from '../../shared/LoadingIndicator';
import FilterableContainer from '../Filterable/FilterableContainer';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import './Prihlaseni.css';

const alignLeftStyler = () => ({ textAlign: 'left' });
const alignRightStyler = () => ({ textAlign: 'right' });
const datumFormat = ({ data, rowIndex }) => moment.utc(data[rowIndex].datum).format('D. M. YYYY');
const kategorieFormat = ({ cellData }) => kategorieToStr(cellData);
const kategorieStyler = ({ cellData }) => ({
  backgroundColor: barvaProTypKategorie(cellData.typ, '0.4'),
  textAlign: 'left'
});
const kodStyler = () => ({ fontFamily: 'monospace', textAlign: 'left' });
const zaplacenoFormat = ({ cellData }) => `${cellData} Kč`;
const zaplacenoStyler = ({ cellData, data, rowIndex }) => ({
  backgroundColor:
    cellData >= data[rowIndex].predepsano ? 'rgba(48, 199, 90, 1.0)' : 'rgba(226, 57, 73, 1.0)',
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'right'
});

class Prihlaseni extends PureComponent {
  componentDidMount = () => {
    this.props.fetchUcastnici();
  };

  render = () => {
    const { actionPrefix, fetching, reduxName, prihlaseni } = this.props;

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
        cellStyler: alignRightStyler,
        key: 'narozeni',
        label: 'narození',
        sortable: true,
        width: 100
      },
      { cellStyler: alignLeftStyler, key: 'obec', sortable: true, width: 90 },
      {
        cellStyler: alignRightStyler,
        cellDataFormatter: datumFormat,
        key: 'datum',
        label: 'přihlášení',
        sortable: true,
        width: 110
      },
      {
        cellStyler: kategorieStyler,
        cellDataFormatter: kategorieFormat,
        key: 'kategorie',
        sortable: true,
        width: 200
      },
      {
        cellStyler: alignRightStyler,
        key: 'startCislo',
        label: 'start. číslo',
        sortable: true,
        width: 100
      },
      { cellStyler: kodStyler, key: 'kod', label: 'kód', width: 150 },
      {
        cellStyler: zaplacenoStyler,
        cellDataFormatter: zaplacenoFormat,
        key: 'zaplaceno',
        width: 80
      }
    ];

    return (
      <div className="Prihlaseni_div UcastniciTable_container">
        <FilterableContainer
          actionPrefix={actionPrefix}
          reduxName={reduxName}
          numberOfItems={prihlaseni.length}
        />

        <UcastniciTableContainer
          actionPrefix={actionPrefix}
          columns={columns}
          data={prihlaseni}
          fixedColumnCount={3}
          reduxName={reduxName}
          rowHeight={35}
        />
      </div>
    );
  };
}

Prihlaseni.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  fetching: PropTypes.bool,
  reduxName: PropTypes.string.isRequired,
  prihlaseni: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.string.isRequired,
      obec: PropTypes.string.isRequired,
      datum: PropTypes.string.isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired
      }).isRequired,
      startCislo: PropTypes.number,
      kod: PropTypes.string,
      predepsano: PropTypes.number.isRequired,
      zaplaceno: PropTypes.number.isRequired
    }).isRequired
  ).isRequired,
  fetchUcastnici: PropTypes.func.isRequired
};

export default Prihlaseni;
