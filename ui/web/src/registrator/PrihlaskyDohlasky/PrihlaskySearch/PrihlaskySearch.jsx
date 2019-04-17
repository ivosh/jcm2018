import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typeahead } from 'react-bootstrap-typeahead';
import './PrihlaskySearch.css';

const stripDiactrics = string => string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const isMatch = (option, { text }) => {
  const { prijmeni, kod } = option;

  const prijmeniLower = stripDiactrics(prijmeni.toLowerCase());
  const textLower = stripDiactrics(text.toLowerCase());

  return prijmeniLower.startsWith(textLower) || kod === text;
};

const PrihlaskySearch = ({ options, onSelect }) => {
  const typeaheadRef = useRef();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'test') {
      typeaheadRef.current.focus();
    }
  });

  return (
    <Typeahead
      autoComplete={false}
      className="PrihlaskySearch"
      emptyLabel="Nic nenalezeno."
      filterBy={isMatch}
      highlightOnlyResult={true}
      labelKey="prijmeni"
      minLength={1}
      options={options}
      placeholder="Začni psát příjmení nebo vlož kód přihlášky."
      ref={typeaheadRef}
      selectHintOnEnter={true}
      onChange={results => {
        if (results.length >= 1) {
          // Typeahead provides an array so take the first result.
          onSelect(results[0]);
        }
      }}
      renderMenuItemChildren={option => {
        const { prijmeni, jmeno, narozeni } = option;
        return `${prijmeni} ${jmeno}, ${narozeni.rok}`;
      }}
    />
  );
};

PrihlaskySearch.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      prijmeni: PropTypes.string.isRequired,
      jmeno: PropTypes.string.isRequired,
      narozeni: PropTypes.shape({
        rok: PropTypes.number.isRequired
      }).isRequired,
      kod: PropTypes.string
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired
};

export default PrihlaskySearch;
