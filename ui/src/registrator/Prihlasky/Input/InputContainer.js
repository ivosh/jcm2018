import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './Input';

const mapStateToProps = state => ({
  rocniky: state.entities.rocniky
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { rocniky } = stateProps;
  const { dispatch } = dispatchProps;
  const {
    form,
    index,
    inline,
    name,
    popisek,
    rawValue,
    Formatter,
    Type,
    formatValue,
    inputChanged,
    inputRef,
    inputOptions,
    inputValid,
    isInputEnabled
  } = ownProps;

  return {
    inline,
    name,
    popisek,
    Formatter,
    Type,
    enabled: isInputEnabled(name, form, rocniky),
    options: inputOptions(name, form, rocniky),
    validationState: inputValid(name, rawValue, form),
    value: formatValue(name, rawValue),
    inputRef: ref => inputRef(index, ref),
    onChange: event => dispatch(inputChanged(name, event))
  };
};

const InputContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Input);

InputContainer.propTypes = {
  form: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  inline: PropTypes.bool,
  name: PropTypes.string.isRequired,
  popisek: PropTypes.string.isRequired,
  rawValue: PropTypes.any,
  Formatter: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]),
  Type: PropTypes.oneOfType([PropTypes.element, PropTypes.func, PropTypes.node]).isRequired,
  formatValue: PropTypes.func.isRequired,
  inputChanged: PropTypes.func.isRequired,
  inputRef: PropTypes.func.isRequired,
  inputOptions: PropTypes.func.isRequired,
  inputValid: PropTypes.func.isRequired,
  isInputEnabled: PropTypes.func.isRequired
};

export default InputContainer;
