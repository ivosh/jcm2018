import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button, Glyphicon, Label } from 'react-bootstrap';
import { dokoncenoArr, dokoncenoStr } from '../../Util';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import StartujiciProTypContainer from '../../shared/StartujiciProTyp/StartujiciProTypContainer';
import './Startujici.css';

// eslint-disable-next-line no-confusing-arrow
export const Renderer = ({ id, startCislo, dokonceno }) =>
  id ? (
    <NavLink
      to={`/prihlasky/${id}`}
      key={startCislo}
      className={`StartujiciProTyp-item Startujici-${dokoncenoStr(dokonceno)[0]}`}
    >
      {startCislo}
    </NavLink>
  ) : (
    <div className="Startujici-neaktivni StartujiciProTyp-item" key={startCislo}>
      {startCislo}
    </div>
  );

Renderer.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool
};

const legendaCommon = () =>
  dokoncenoArr.map(dokonceno => (
    <Label
      key={dokoncenoStr(dokonceno)[0]}
      className={`Startujici_legenda_item Startujici-${dokoncenoStr(dokonceno)[0]}`}
    >
      {dokoncenoStr(dokonceno)[1]}
    </Label>
  ));

export const LegendaPrihlaseni = () => (
  <div className="Startujici_legenda">
    Legenda: {legendaCommon()}
    <Label className="Startujici_legenda_item Startujici-neaktivni">neaktivní</Label>
  </div>
);

export const LegendaOdstartovani = () => (
  <div className="Startujici_legenda">Legenda: {legendaCommon()}</div>
);

const Startujici = ({ odstartovani, typy, onOdstartovaniChange }) => (
  <div className="Startujici_div">
    <div className="Startujici_buttons">
      <Button
        active={!odstartovani}
        bsStyle="primary"
        className="Startujici_button"
        onClick={onOdstartovaniChange}
      >
        <Glyphicon glyph="list-alt" /> Přihlášeni
      </Button>
      <Button
        active={odstartovani}
        bsStyle="success"
        className="Startujici_button"
        onClick={onOdstartovaniChange}
      >
        <Glyphicon glyph="road" /> Odstartováni
      </Button>
    </div>
    {odstartovani ? <LegendaOdstartovani /> : <LegendaPrihlaseni />}
    {typy.map(typ => (
      <div key={typ} className="Startujici_typ">
        <div className="Startujici_popisek">
          <PopisekKategorie typ={typ} />
        </div>
        <StartujiciProTypContainer
          jenStartujici={odstartovani}
          odstartovani={odstartovani}
          typ={typ}
          renderer={Renderer}
        />
      </div>
    ))}
  </div>
);

Startujici.propTypes = {
  odstartovani: PropTypes.bool.isRequired,
  typy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOdstartovaniChange: PropTypes.func.isRequired
};

export default Startujici;
