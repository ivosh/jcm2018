import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';
import { inputChanged } from './PrihlaskyActions';
import { formatValue, inputOptions, inputValid, isInputEnabled } from './prihlaskyReducer';

const mapStateToProps = state => ({
  prihlasky: state.registrator.prihlasky,
  rocniky: state.entities.rocniky,
  ucastnici: state.entities.ucastnici
});

const mapDispatchToProps = dispatch => ({
  dispatch
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { prihlasky, rocniky, ucastnici } = stateProps;
  const { index, inline, name, popisek, Formatter, Type, inputRef } = ownProps;
  const [section, subName] = name.split('.');
  const rawValue = stateProps.prihlasky[section][subName];

  return {
    inline,
    name,
    popisek,
    Formatter,
    Type,
    enabled: isInputEnabled(name, prihlasky, rocniky),
    options: inputOptions(name, prihlasky, rocniky, ucastnici),
    validationState: inputValid(name, rawValue, prihlasky),
    value: formatValue(name, rawValue),
    inputRef: ref => inputRef(index, ref),
    onChange: event => dispatchProps.dispatch(inputChanged(name, event))
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
