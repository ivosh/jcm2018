import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import InputContainer from '../Input/InputContainer';
import { formatValue, inputOptions, inputValid, isInputEnabled } from './prihlaskyFormReducer';

const mapStateToProps = state => ({
  form: state.registrator.prihlasky.form
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { form } = stateProps;
  const { index, inline, name, popisek, Formatter, Type, inputRef } = ownProps;
  const [section, subName] = name.split('.');
  const rawValue = form[section][subName];

  return {
    actionPrefix: 'PRIHLASKY',
    form,
    index,
    inline,
    name,
    popisek,
    rawValue,
    Formatter,
    Type,
    formatValue,
    inputOptions,
    inputValid,
    isInputEnabled,
    inputRef
  };
};

const PrihlaskyFormInputContainer = connect(mapStateToProps, null, mergeProps)(InputContainer);

PrihlaskyFormInputContainer.propTypes = {
  index: PropTypes.number.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  Formatter: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]).isRequired,
  inputRef: PropTypes.func.isRequired
};

export default PrihlaskyFormInputContainer;
