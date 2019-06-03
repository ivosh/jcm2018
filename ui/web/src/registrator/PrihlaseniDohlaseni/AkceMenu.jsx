import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AkceMenu.css';

const AkceMenu = ({ akce, onSelect }) => {
  const [vybrana, setVybrana] = useState(-1);

  const handleSelect = index => {
    setVybrana(index);
    onSelect(index);
  };

  if (vybrana >= 0 && vybrana < akce.length) {
    return akce[vybrana].component;
  }

  return (
    <ul className="AkceMenu">
      {akce.map(({ nazev }, index) => (
        <li key={nazev}>
          <button type="submit" onClick={() => handleSelect(index)}>
            {nazev}
          </button>
        </li>
      ))}
    </ul>
  );
};

AkceMenu.propTypes = {
  akce: PropTypes.arrayOf(
    PropTypes.shape({
      nazev: PropTypes.string.isRequired,
      component: PropTypes.node.isRequired
    })
  ).isRequired,
  onSelect: PropTypes.func
};

AkceMenu.defaultProps = {
  onSelect: () => {}
};

export default AkceMenu;
