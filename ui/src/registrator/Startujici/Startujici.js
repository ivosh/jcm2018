import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Label } from 'react-bootstrap';
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

export const Legenda = () => (
  <div className="Startujici_legenda">
    Legenda:
    {dokoncenoArr.map(dokonceno => (
      <Label
        key={dokoncenoStr(dokonceno)[0]}
        className={`Startujici_legenda_item Startujici-${dokoncenoStr(dokonceno)[0]}`}
      >
        {dokoncenoStr(dokonceno)[1]}
      </Label>
    ))}
    <Label className="Startujici_legenda_item Startujici-neaktivni">neaktivní</Label>
  </div>
);

const Startujici = ({ typy }) => (
  <div className="Startujici_div">
    <Legenda />
    {typy.map(typ => (
      <div key={typ} className="Startujici_typ">
        <div className="Startujici_popisek">
          <PopisekKategorie typ={typ} />
        </div>
        <StartujiciProTypContainer
          jenStartujici={false}
          prihlasky={true}
          typ={typ}
          renderer={Renderer}
        />
      </div>
    ))}
  </div>
);

Startujici.propTypes = {
  typy: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Startujici;
