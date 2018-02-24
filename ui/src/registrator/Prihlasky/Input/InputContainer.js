import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import { inputChanged } from './InputActions';
import {
  formatValue,
  inputOptions,
  inputValid,
  isInputEnabled
} from '../PrihlaskyForm/prihlaskyFormReducer';

const mapStateToProps = state => ({
  prihlaskyForm: state.registrator.prihlasky.form,
  rocniky: state.entities.rocniky,
  ucastnici: state.entities.ucastnici
});

const mapDispatchToProps = dispatch => ({
  onChange: (name, event) => dispatch(inputChanged(name, event))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { prihlaskyForm, rocniky } = stateProps;
  const { onChange } = dispatchProps;
  const { index, inline, name, popisek, Formatter, Type, inputRef } = ownProps;
  const [section, subName] = name.split('.');
  const rawValue = prihlaskyForm[section][subName];

  return {
    inline,
    name,
    popisek,
    Formatter,
    Type,
    enabled: isInputEnabled(name, prihlaskyForm, rocniky),
    options: inputOptions(name, prihlaskyForm, rocniky),
    validationState: inputValid(name, rawValue, prihlaskyForm),
    value: formatValue(name, rawValue),
    inputRef: ref => inputRef(index, ref),
    onChange: event => onChange(name, event)
  };
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Input);

InputContainer.propTypes = {
  index: PropTypes.number.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  Formatter: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  inputRef: PropTypes.func.isRequired
};

export default InputContainer;
