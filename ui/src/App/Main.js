import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { navsForMenu, navMenus } from './nav';
import './Main.css';

const Item = ({ glyph, name }) => (
  <React.Fragment>
    <Glyphicon glyph={glyph} /> {name}
  </React.Fragment>
);
Item.propTypes = {
  glyph: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const Menu = ({ glyph, menu }) => (
  <div className="Main__menu">
    <span className="Main__menu-header">
      <Item glyph={glyph} name={menu} />
    </span>
    <ul>
      {navsForMenu({ menu }).map(nav => (
        <li className="Main__menu-item" key={nav.key}>
          <Link className="Main__menu-link" to={nav.path}>
            <Item {...nav} />
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
Menu.propTypes = {
  glyph: PropTypes.string.isRequired,
  menu: PropTypes.string.isRequired
};

const Main = () => (
  <div className="Main__div">
    <p>Možnosti aplikace:</p>
    <div className="Main__menus">
      {navMenus.map(({ glyph, name }) => (
        <Menu key={name} glyph={glyph} menu={name} />
      ))}
    </div>
  </div>
);

export default Main;
