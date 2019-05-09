import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import shouldAutoFocus from '../../shouldAutoFocus';
import './TextFilter.css';

const TextFilter = ({ filter, onChange }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (shouldAutoFocus()) {
      inputRef.current.focus();
    }
  });

  return (
    <DebounceInput
      className="TextFilter__input"
      debounceTimeout={500}
      minLength={0}
      placeholder="Filtr na příjmení a jméno"
      value={filter}
      inputRef={inputRef}
      onChange={e => onChange(e.target.value)}
    />
  );
};

TextFilter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextFilter.defaultProps = {
  filter: undefined
};

export default TextFilter;
