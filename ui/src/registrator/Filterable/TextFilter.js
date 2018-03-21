import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import './TextFilter.css';

class TextFilter extends Component {
  componentDidMount = () => {
    if (process.env.NODE_ENV !== 'test') {
      this.input.focus();
    }
  };

  render = () => {
    const { filter, onChange } = this.props;

    return (
      <DebounceInput
        className="TextFilter__input"
        debounceTimeout={500}
        minLength={0}
        placeholder="Filtr na příjmení a jméno"
        value={filter}
        inputRef={ref => {
          this.input = ref;
        }}
        onChange={e => onChange(e.target.value)}
      />
    );
  };
}

TextFilter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextFilter;
