import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import moment from 'moment';
import { narozeniToStr } from '../../Util';
import Modal from '../../shared/Modal/Modal';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import FilterableContainer from '../Filterable/FilterableContainer';
import UcastniciTableContainer from '../UcastniciTable/UcastniciTableContainer';
import PoznamkyContainer from '../Poznamky/PoznamkyContainer';
import AkceMenu from './AkceMenu';
import EmailStartCislo from './EmailStartCislo';
import EmailStartovne from './EmailStartovne';
import PrihlaseniDohlaseniFilter from './PrihlaseniDohlaseniFilter';
import './PrihlaseniDohlaseni.css';

const datumFormat = ({ cellData }) => moment.utc(cellData).format('D. M. YYYY');

const kategorieFormat = ({ cellData }) => <PopisekKategorie {...cellData} />;
kategorieFormat.propTypes = {
  cellData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

const narozeniFormat = ({ cellData }) => narozeniToStr(cellData);

const AkceMenuFormat = ({
  cellData: { id, nejakaPoznamka, showing, onHide, onShow },
  data,
  rowIndex,
}) => {
  const akce = [{ icon: 'edit', nazev: 'Poznámky', component: <PoznamkyContainer id={id} /> }];
  if (data[rowIndex].email) {
    akce.push({
      icon: 'envelope',
      nazev: 'Upomínka emailem: startovné',
      component: (
        <EmailStartovne
          prijmeni={data[rowIndex].prijmeni}
          jmeno={data[rowIndex].jmeno}
          pohlavi={data[rowIndex].pohlavi}
          email={data[rowIndex].email}
          kod={data[rowIndex].kod}
          predepsano={data[rowIndex].predepsano}
        />
      ),
    });
    akce.push({
      icon: 'envelope',
      nazev: 'Upomínka emailem: startovní číslo',
      component: (
        <EmailStartCislo
          pohlavi={data[rowIndex].pohlavi}
          email={data[rowIndex].email}
          kategorie={data[rowIndex].kategorie}
          startCislo={data[rowIndex].startCislo}
        />
      ),
    });
  }

  return (
    <>
      {!showing && (
        <Button bsSize="small" bsStyle={nejakaPoznamka ? 'info' : undefined} onClick={onShow}>
          <Glyphicon glyph="edit" />
        </Button>
      )}
      {showing && (
        <Modal header="Akce" show={showing} onClose={onHide}>
          <AkceMenu akce={akce} />
        </Modal>
      )}
    </>
  );
};
AkceMenuFormat.propTypes = {
  cellData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nejakaPoznamka: PropTypes.bool.isRequired,
    showing: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
  }).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired,
      email: PropTypes.string,
      kod: PropTypes.string,
      predepsano: PropTypes.number.isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired,
      }).isRequired,
      startCislo: PropTypes.number,
    })
  ).isRequired,
  rowIndex: PropTypes.number.isRequired,
};

const prijmeniFormat = ({ cellData, data, route, rowIndex }) => (
  <Link to={`/${route}/${data[rowIndex].id}`}>{cellData}</Link>
);
prijmeniFormat.propTypes = {
  cellData: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  data: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string.isRequired })).isRequired,
  route: PropTypes.string.isRequired,
  rowIndex: PropTypes.number.isRequired,
};

const zaplacenoFormat = ({ cellData }) => `${cellData} Kč`;

const PrihlaseniDohlaseni = ({
  actionPrefix,
  reduxName,
  route,
  dohlaseniFilter,
  prihlaseniFilter,
  prihlaseniDohlaseni,
}) => {
  const columns = [
    {
      cellClassNames: () => ['align-left'],
      cellDataFormatter: prijmeniFormat,
      key: 'prijmeni',
      label: 'příjmení',
      sortable: true,
      width: 100,
    },
    {
      cellClassNames: () => ['align-left'],
      key: 'jmeno',
      label: 'jméno',
      sortable: true,
      width: 90,
    },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: narozeniFormat,
      key: 'narozeni',
      label: 'narození',
      sortable: true,
      width: 100,
    },
    { cellClassNames: () => ['align-left'], key: 'obec', sortable: true, width: 90 },
    { cellClassNames: () => ['align-left'], key: 'email', sortable: true, width: 200 },
    {
      cellClassNames: () => ['align-right'],
      cellDataFormatter: datumFormat,
      key: 'datum',
      label: 'přihlášení',
      sortable: true,
      width: 110,
    },
    {
      cellClassNames: ({ cellData }) => ['align-left', `PrihlaseniDohlaseni--${cellData.typ}`],
      cellDataFormatter: kategorieFormat,
      key: 'kategorie',
      sortable: true,
      width: 180,
    },
    {
      cellClassNames: () => ['align-right'],
      key: 'startCislo',
      label: 'číslo',
      sortable: true,
      width: 70,
    },
    { cellClassNames: () => ['align-left', 'monospace'], key: 'kod', label: 'kód', width: 90 },
    {
      cellClassNames: ({ cellData, data, rowIndex }) => {
        if (cellData >= data[rowIndex].predepsano) {
          return ['PrihlaseniDohlaseni--zaplaceno'];
        }
        if (cellData > 0) {
          return ['PrihlaseniDohlaseni--castecne-zaplaceno'];
        }
        return ['PrihlaseniDohlaseni--nezaplaceno'];
      },
      cellDataFormatter: zaplacenoFormat,
      key: 'zaplaceno',
      sortable: true,
      width: 110,
    },
    {
      cellClassNames: () => ['PrihlaseniDohlaseni__akceMenu'],
      cellDataFormatter: AkceMenuFormat,
      key: 'akceMenu',
      label: 'Akce',
      width: 100,
    },
  ];

  return (
    <div className="PrihlaseniDohlaseni__div UcastniciTable_container">
      <div className="PrihlaseniDohlaseni__filters">
        <PrihlaseniDohlaseniFilter bsStyle="primary" {...prihlaseniFilter} />
        <PrihlaseniDohlaseniFilter bsStyle="success" {...dohlaseniFilter} />
        <FilterableContainer
          actionPrefix={actionPrefix}
          reduxName={reduxName}
          numberOfItems={prihlaseniDohlaseni.length}
        />
      </div>

      <UcastniciTableContainer
        actionPrefix={actionPrefix}
        columns={columns}
        data={prihlaseniDohlaseni}
        fixedColumnCount={3}
        reduxName={reduxName}
        route={route}
        rowHeight={35}
      />
    </div>
  );
};

PrihlaseniDohlaseni.propTypes = {
  actionPrefix: PropTypes.string.isRequired,
  reduxName: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
  dohlaseniFilter: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  prihlaseniFilter: PropTypes.shape({
    active: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired,
  prihlaseniDohlaseni: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        den: PropTypes.number,
        mesic: PropTypes.number,
        rok: PropTypes.number.isRequired,
      }).isRequired,
      pohlavi: PropTypes.oneOf(['muž', 'žena']).isRequired,
      obec: PropTypes.string.isRequired,
      email: PropTypes.string,
      datum: PropTypes.instanceOf(Date).isRequired,
      kategorie: PropTypes.shape({
        typ: PropTypes.string.isRequired,
      }).isRequired,
      startCislo: PropTypes.number,
      kod: PropTypes.string,
      predepsano: PropTypes.number.isRequired,
      zaplaceno: PropTypes.number.isRequired,
      akceMenu: PropTypes.shape({
        id: PropTypes.string.isRequired,
        nejakaPoznamka: PropTypes.bool.isRequired,
        showing: PropTypes.bool.isRequired,
        onHide: PropTypes.func.isRequired,
        onShow: PropTypes.func.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};

export default PrihlaseniDohlaseni;
