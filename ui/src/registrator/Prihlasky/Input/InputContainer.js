import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import { inputChanged } from './InputActions';
import {
  platbyFormatValue,
  platbyInputOptions,
  platbyInputValid,
  platbyIsInputEnabled
} from '../Platby/platbyReducer';
import {
  prihlaskyFormatValue,
  prihlaskyInputOptions,
  prihlaskyInputValid,
  prihlaskyIsInputEnabled
} from '../PrihlaskyForm/prihlaskyFormReducer';

const mapStateToProps = state => ({
  novaPlatba: state.registrator.prihlasky.platby,
  prihlaskyForm: state.registrator.prihlasky.form,
  rocniky: state.entities.rocniky,
  ucastnici: state.entities.ucastnici
});

const mapDispatchToProps = dispatch => ({
  onChange: (name, event) => dispatch(inputChanged(name, event))
});

const mapSection = (form, section, subName) => ({
  rawValue: section === 'novaPlatba' ? form[subName] : form[section][subName],
  isInputEnabled: section === 'novaPlatba' ? platbyIsInputEnabled : prihlaskyIsInputEnabled,
  inputOptions: section === 'novaPlatba' ? platbyInputOptions : prihlaskyInputOptions,
  inputValid: section === 'novaPlatba' ? platbyInputValid : prihlaskyInputValid,
  formatValue: section === 'novaPlatba' ? platbyFormatValue : prihlaskyFormatValue
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { novaPlatba, prihlaskyForm, rocniky } = stateProps;
  const { onChange } = dispatchProps;
  const { index, inline, name, popisek, Formatter, Type, inputRef } = ownProps;

  const [section, subName] = name.split('.');
  const form = section === 'novaPlatba' ? novaPlatba : prihlaskyForm;
  const mapped = mapSection(form, section, subName);

  return {
    inline,
    name,
    popisek,
    Formatter,
    Type,
    enabled: mapped.isInputEnabled(name, form, rocniky),
    options: mapped.inputOptions(name, form, rocniky),
    validationState: mapped.inputValid(name, mapped.rawValue, form),
    value: mapped.formatValue(name, mapped.rawValue),
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
