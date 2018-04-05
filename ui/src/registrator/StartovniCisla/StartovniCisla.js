import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import { dokoncenoArr, dokoncenoStr } from '../../Util';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import StartujiciProTypContainer from '../../shared/StartujiciProTyp/StartujiciProTypContainer';
import Legenda from '../../shared/StartujiciProTyp/Legenda';
import './StartovniCisla.css';

export const Renderer = ({ id, startCislo, dokonceno }) =>
  id ? (
    <NavLink
      to={`/prihlasky/${id}`}
      key={startCislo}
      className={`StartujiciProTyp-item Legenda-item-${dokoncenoStr(dokonceno)[0]}`}
    >
      {startCislo}
    </NavLink>
  ) : (
    <div className="StartujiciProTyp-item Legenda-item-neaktivni" key={startCislo}>
      {startCislo}
    </div>
  );

Renderer.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool
};

const legendaPrihlaseni = () =>
  dokoncenoArr.map(dokonceno => ({
    name: dokoncenoStr(dokonceno)[0],
    popisek: dokoncenoStr(dokonceno)[1]
  }));

const legendaOdstartovani = () => {
  const legenda = legendaPrihlaseni();
  legenda.push({ name: 'neaktivni', popisek: 'neaktivní' });
  return legenda;
};

const StartovniCisla = ({ odstartovani, typy, onOdstartovaniChange }) => (
  <div className="StartovniCisla__div">
    <div className="StartovniCisla__buttons">
      <Button
        active={!odstartovani}
        bsStyle="primary"
        className="StartovniCisla__button"
        onClick={onOdstartovaniChange}
      >
        <Glyphicon glyph="list-alt" /> Přihlášeni
      </Button>
      <Button
        active={odstartovani}
        bsStyle="success"
        className="StartovniCisla__button"
        onClick={onOdstartovaniChange}
      >
        <Glyphicon glyph="road" /> Odstartováni
      </Button>
    </div>
    <div className="StartovniCisla__legenda">
      <Legenda legenda={odstartovani ? legendaOdstartovani() : legendaPrihlaseni()} />
    </div>
    {typy.map(typ => (
      <div key={typ} className="StartovniCisla__typ">
        <div className="StartovniCisla__popisek">
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

StartovniCisla.propTypes = {
  odstartovani: PropTypes.bool.isRequired,
  typy: PropTypes.arrayOf(PropTypes.string).isRequired,
  onOdstartovaniChange: PropTypes.func.isRequired
};

export default StartovniCisla;
