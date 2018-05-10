import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import './TextFilter.css';

class TextFilter extends PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  componentDidMount = () => {
    if (process.env.NODE_ENV !== 'test') {
      this.inputRef.current.focus();
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
        inputRef={this.inputRef}
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
