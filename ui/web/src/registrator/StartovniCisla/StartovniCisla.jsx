import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Button, Glyphicon } from 'react-bootstrap';
import { dokoncene, findDokonceno } from '../../Util';
import PopisekKategorie from '../../shared/Popisek/PopisekKategorie';
import StartovniCislaProTypContainer from '../../shared/StartovniCislaProTyp/StartovniCislaProTypContainer';
import Legenda from '../../shared/StartovniCislaProTyp/Legenda';
import './StartovniCisla.css';

const navLink = (id, odstartovani) => (odstartovani ? `/dohlasky/${id}` : `/prihlasky/${id}`);

export const Renderer = ({ id, startCislo, dokonceno, odstartovani }) =>
  id ? (
    <NavLink
      to={navLink(id, odstartovani)}
      className={`StartovniCislaProTyp__item Legenda__item--${findDokonceno(dokonceno).name}`}
    >
      {startCislo}
    </NavLink>
  ) : (
    <div className="StartovniCislaProTyp__item Legenda__item--neaktivni">{startCislo}</div>
  );

Renderer.propTypes = {
  id: PropTypes.string,
  startCislo: PropTypes.number.isRequired,
  dokonceno: PropTypes.bool,
  odstartovani: PropTypes.bool.isRequired
};
Renderer.defaultProps = {
  id: undefined,
  dokonceno: undefined
};

const legendaOdstartovani = () => Object.values(dokoncene);

const legendaPrihlaseni = () => {
  const legenda = legendaOdstartovani();
  legenda.push({ name: 'neaktivni', popisek: 'neaktivní' });
  return legenda;
};

const StartovniCisla = ({ odstartovani, typy, onOdstartovaniChange }) => (
  <div className="StartovniCisla__div">
    <div className="StartovniCisla__buttons Bootstrap-buttons--active">
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
        <StartovniCislaProTypContainer
          jenStartujici={odstartovani}
          odstartovani={odstartovani}
          typ={typ}
          Renderer={Renderer}
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
